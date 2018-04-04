import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    //console.log(this.auth);
    if (this.auth.getAuth() == true) {
      return true;
    }
    this.router.navigate(['/homeworks']);
    return false;
  }
}
