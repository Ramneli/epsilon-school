import { Injectable } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private isLoggedIn: boolean;
  private userId: string;
  private user: any;
  constructor(public af: AngularFireAuth) {
    console.log("Service running...");
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.userId = localStorage.getItem("token");
    }
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return this.af.auth.signInWithPopup(provider).then(success => {
      this.isLoggedIn = true;
      this.userId = success.user.uid;
<<<<<<< HEAD
      this.user = this.af.auth.currentUser;
      var token = this.af.auth.currentUser.getIdToken();
      localStorage.setItem("token", this.user.uid);
=======
      console.log(success.user.getIdToken());
>>>>>>> 90d87a14f74243b6ed56dc8f92cefb05efca2104
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

  getAuthentication() {
    return this.user ? true : false;
  }
  
  getUser() {
    return this.user;
  }
}
