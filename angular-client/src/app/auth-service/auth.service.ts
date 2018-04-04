import { Injectable } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private isLoggedIn: boolean;
  private userId: string;
  constructor(public af: AngularFireAuth) {
      this.isLoggedIn = false;
      this.userId = "";
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return this.af.auth.signInWithPopup(provider).then(success => {
      this.isLoggedIn = true;
      this.userId = success.user.uid;
    });
  }

  setLoginStatus(status) {
    this.isLoggedIn = status;
  }

  setUserId(id) {
    this.userId = id;
  }

  getUserId() : string {
    return this.userId;
  }

  logout() {
    return this.af.auth.signOut();
  }
  getAuth(): boolean {
    return this.isLoggedIn;
  }
}
