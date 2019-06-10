import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../models/course.interface';
import { map, filter } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  collection = 'courses';

  userId: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {
    this.auth.user$
      .pipe(filter(u => !!u))
      .subscribe(u => (this.userId = u.uid));
  }

  findAll(): Observable<Course[]> {
    return this.db
      .collection<Course>(this.collection)
      .snapshotChanges()
      .pipe(
        map(courses => {
          return courses
            .map(course => {
              const data = course.payload.doc.data() as Course;
              const uid = course.payload.doc.id;
              return { uid, ...data };
            })
            .filter(course => !course.deleted)
            .sort((a, b) => a.sort - b.sort);
        })
      );
  }

  findById(id: string): Observable<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .valueChanges();
  }

  create(data: Course): Promise<any> {
    return this.db.collection(this.collection).add({
      createDate: firestore.FieldValue.serverTimestamp(),
      createUserId: this.userId,
      ...data
    });
  }

  update(uid: string, data: Course): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(uid)
      .update({
        updateDate: firestore.FieldValue.serverTimestamp(),
        updateUserId: this.userId,
        ...data
      });
  }

  delete(uid: string): Promise<any> {
    return this.update(uid, {
      deleteDate: firestore.FieldValue.serverTimestamp(),
      deleteUserId: this.userId,
      deleted: true
    });
  }

  updateImage(uid: string, img: { url: string; path: string }): Promise<any> {
    return this.update(uid, { img });
  }

  deleteImage(uid: string, path: string): Promise<any> {
    this.storage
      .ref(path)
      .delete()
      .toPromise();
    return this.update(uid, {
      img: firestore.FieldValue.delete() as any
    });
  }

  updateLogo(uid: string, logo: { url: string; path: string }): Promise<any> {
    return this.update(uid, { logo });
  }

  deleteLogo(uid: string, path: string): Promise<any> {
    this.storage
      .ref(path)
      .delete()
      .toPromise();
    return this.update(uid, {
      logo: firestore.FieldValue.delete() as any
    });
  }
}
