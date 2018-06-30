import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../message-service/message.service';

@Injectable()
export class NotificationService {

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  loadNotifications() {
    const notificationsUrl = 'http://localhost:8080/notification/load';
    return this.http.post(notificationsUrl, '');
  }

  saveNotification(notificationData) {
    const notificationsUrl = 'http://localhost:8080/notification/save';
    return this.http.post(notificationsUrl, notificationData);
  }

}
