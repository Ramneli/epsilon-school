import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> {
    console.log("Authenticated: " + this.auth.getAuth());
    return this.auth.getAuth() ? Observable.of(true) : Observable.of(false);
  }
}
