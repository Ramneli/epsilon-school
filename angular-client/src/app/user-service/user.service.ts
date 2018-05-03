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

  getBlockStatus() {
    const userBlockStatusURL = "http://localhost:8080/user/access?uid=" + this.authService.getUserId();
    return this.http.get(userBlockStatusURL);
  }


  getReportedUsers() {
    const reportedUsersURL = "http://localhost:8080/user/allReported";
    return this.http.post(reportedUsersURL, "");
  }

  setBlockStatus(uid) {
    const changeBlockStatusURL = "http://localhost:8080/user/changeblock?uid=" + uid;
    return this.http.get(changeBlockStatusURL);
  }

  getReporteeInfo(uid) {
    const reporteeInfoURL = "http://localhost:8080/report/get?reportee=" + uid;
    return this.http.get(reporteeInfoURL);
  }

  resolveReport(uid) {
    console.log(uid);
    const resolveReportURL = "http://localhost:8080/user/resolveReport?uid=" + uid;
    return this.http.get(resolveReportURL);
  }
}
