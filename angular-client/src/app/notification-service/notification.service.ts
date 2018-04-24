import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message-service/message.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class NotificationService {

  constructor(private messageService: MessageService,
    private http: HttpClient,
   private authService : AuthService) { }

  loadNotifications() {;
    const notificationsUrl = 'http://localhost:8080/notification/load';
    return this.http.post(notificationsUrl, "");
	}

}
