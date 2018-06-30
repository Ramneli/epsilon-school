import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private isLoggedIn: boolean;
  private userId: string;
  private user: any;
  private admin = false;

  constructor(public af: AngularFireAuth) {
    console.log('Service running...');
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.userId = localStorage.getItem('token');
    }
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.af.auth.signInWithPopup(provider).then(success => {
      this.isLoggedIn = true;
      this.userId = success.user.uid;
      this.user = this.af.auth.currentUser;
      localStorage.setItem('token', this.user.uid);
    });
  }

  setLoginStatus(status) {
    this.isLoggedIn = status;
  }

  setUserId(id) {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  logout() {
    return this.af.auth.signOut();
  }

  getAuth(): boolean {
    return this.isLoggedIn;
  }

  setAdminStatus(status: boolean) {
    this.admin = status;
  }

  getAdminStatus(): boolean {
    return this.admin;
  }
}
