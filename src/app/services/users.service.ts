import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  collection = 'users';
  constructor(private afs: AngularFirestore) {}

  get(id: string): AngularFirestoreDocument<User> {
    return this.afs.collection(this.collection).doc(id);
  }

  fetch(): Observable<Array<User>> {
    return this.afs.collection<User>(this.collection).valueChanges();
  }

  getData(id: string): Observable<User> {
    return this.afs
      .collection(this.collection)
      .doc<User>(id)
      .valueChanges();
  }

  update(id: string, data: any) {
    return this.afs
      .collection(this.collection)
      .doc(id)
      .update(data);
  }
}
