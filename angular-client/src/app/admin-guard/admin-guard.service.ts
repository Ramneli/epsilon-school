import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private authService : AuthService,
              private router : Router,
              private userService : UserService) {
                console.log("AdminGuard: Running...");
                this.userService.getUserStatus().subscribe(user=> {
                  if (user) {
                    console.log("User has admin access.")
                    this.router.navigate['/homeworks'];
                  } else {
                    alert("You don't have permission to access this page. This incident will be reported.");
                    this.router.navigate['/homeworks'];
                  }
                });
               }

  canActivate(): Observable<boolean> {
    console.log(this.authService.getAdminStatus());
    if (!this.authService.getAdminStatus()) {
      this.router.navigate['/homeworks'];
      return Observable.of(false);
    } else {
      this.router.navigate['/'];
      return Observable.of(true);
    }
    //return this.authService.getAdminStatus() ? Observable.of(true) : Observable.of(false);
  }
}
