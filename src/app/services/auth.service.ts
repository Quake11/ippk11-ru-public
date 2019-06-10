import { UsersService } from './users.service';
import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { of } from 'rxjs';
import { switchMap, filter, take, map } from 'rxjs/operators';
import { ApplicationVerifier } from '@firebase/auth-types';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  isAdmin$: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private users: UsersService
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.users.getData(user.uid);
        } else {
          return of(null);
        }
      })
    );

    this.isAdmin$ = this.user$.pipe(
      map(user => {
        if (!user) {
          return false;
        }
        return user.admin;
      })
    );
  }

  signOut(): Promise<any> {
    // this.presence.setPresence('offline');
    return this.afAuth.auth.signOut().then(() => {
      console.log('signed out');

      // this.router.navigate(['/']);
    });
  }

  googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  phoneLogin(phone: string, verifier: ApplicationVerifier) {
    const provider = new firebase.auth.PhoneAuthProvider();
    return this.smsAuthLogin(provider, phone, verifier);
  }

  smsAuthLogin(provider, phone: string, verifier: ApplicationVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(phone, verifier);
  }

  async verifySmsCode(confirmationResult, verificationCode) {
    try {
      const credential = await confirmationResult.confirm(verificationCode);
      const userData = credential.user;

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${userData.uid}`
      );

      const userSnapshot = userRef.snapshotChanges();

      userSnapshot
        .pipe(
          filter(snapshot => !!snapshot),
          take(1)
        )
        .subscribe(snapshot => {
          if (snapshot.payload.exists) {
            // this.updateUserData(userRef, userData, provider.providerId);
          } else {
            this.createUser(
              userRef,
              { ...userData, displayName: 'noname' },
              'phone'
            );
          }
        });

      this.successSignin();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    const userData = credential.user;

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userData.uid}`
    );

    const userSnapshot = userRef.snapshotChanges();

    userSnapshot
      .pipe(
        filter(snapshot => !!snapshot),
        take(1)
      )
      .subscribe(snapshot => {
        console.log(snapshot);

        if (snapshot.payload.exists) {
          // this.updateUserData(userRef, userData, provider.providerId);
        } else {
          this.createUser(userRef, userData, provider.providerId);
        }
      });

    this.successSignin();
  }

  successSignin() {
    console.log('successSignin');
    /*     this.utils.addSingleToast({
      severity: 'success',
      summary: 'Успешная авторизация',
      detail: 'Добро пожаловать!'
    }); */
  }

  successUpdate() {
    console.log('successUpdate');

    /*     this.utils.addSingleToast({
      severity: 'success',
      summary: 'Успешное обновление данных',
      detail: 'Данные учётной записи обновлены'
    }); */
    // this.router.navigate(['/']);
  }

  successCreate() {
    console.log('successCreate');
    /*     this.utils.addSingleToast({
      severity: 'success',
      summary: 'Успешная регистрация',
      detail: 'Учётная запись создана'
    }); */
    // this.router.navigate(['/']);
  }

  // Update user data in firestore on login
  updateUserData(userRef: AngularFirestoreDocument<any>, userData, providerId) {
    const data: User = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      phoneNumber: userData.phoneNumber,
      provider: providerId
    };

    return userRef.update(data).then(() => this.successUpdate());
  }

  createUser(userRef: AngularFirestoreDocument<any>, userData, providerId) {
    const data: User = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      phoneNumber: userData.phoneNumber,
      provider: providerId
    };

    return userRef.set(data).then(() => this.successCreate());
  }
}
