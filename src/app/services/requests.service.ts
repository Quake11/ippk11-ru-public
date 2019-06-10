import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { UserRequest } from '../models/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  collection = 'requests';

  constructor(private db: AngularFirestore) {}

  findAll(): Observable<UserRequest[]> {
    return this.db
      .collection<UserRequest>(this.collection)
      .snapshotChanges()
      .pipe(
        map(requests => {
          return requests
            .map(request => {
              const data = request.payload.doc.data() as UserRequest;
              const uid = request.payload.doc.id;
              return { uid, ...data };
            })
            .filter(request => !request.deleted)
            .sort((a, b) => b.createDate.seconds - a.createDate.seconds);
        })
      );
  }

  findById(id: string): Observable<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .valueChanges();
  }

  create(data: UserRequest): Promise<any> {
    return this.db.collection(this.collection).add({
      createDate: firestore.FieldValue.serverTimestamp(),
      ...data
    });
  }

  delete(uid: string): Promise<any> {
    return this.update(uid, {
      deleteDate: firestore.FieldValue.serverTimestamp(),
      deleted: true
    });
  }

  update(uid: string, data: UserRequest): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(uid)
      .update({
        updateDate: firestore.FieldValue.serverTimestamp(),
        ...data
      });
  }
}
