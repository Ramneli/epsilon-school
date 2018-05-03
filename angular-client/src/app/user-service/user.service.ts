import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private authService : AuthService,
              private http : HttpClient) { }

  getUserStatus() {
    const userStatusURL = "http://localhost:8080/user/status?uid=" + this.authService.getUserId();
    return this.http.get(userStatusURL);
  }

}
