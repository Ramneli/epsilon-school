import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveSettings(showOldTasks: string) {
    const settingsUrl = 'http://localhost:8080/settings/update';
    const uid = this.authService.getUserId();
    const settings = {
      'uid': uid,
      'oldTasks': showOldTasks
    };
    console.log(settings);
    return this.http.post(settingsUrl, settings);
  }

  loadSettings() {
    const settingsUrl = 'http://localhost:8080/settings/load?uid=' + this.authService.getUserId();
    console.log(settingsUrl);
    return this.http.post(settingsUrl, '');
  }
}
