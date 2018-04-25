import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { auth } from 'firebase/app';

@Injectable()
export class SettingsService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  saveSettings(showOldTasks : string) {
    const settingsUrl = 'http://localhost:8080/settings/update';
    let uid = this.authService.getUserId();
    let settings = {
      "uid" : uid,
      "oldTasks" : showOldTasks
    }
    console.log(settings);
    return this.http.post(settingsUrl, settings);
  }

  loadSettings() {
    const settingsUrl = 'http://localhost:8080/settings/load?uid=' + this.authService.getUserId();
    console.log(settingsUrl);
    return this.http.post(settingsUrl, "");
  }
}
