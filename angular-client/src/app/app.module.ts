import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { ShowHomeworksComponent } from './show-homeworks/show-homeworks.component';
import { AppRoutingModule } from './app-routing.module';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { MessagesComponent } from './messages/messages.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EapCalculatorComponent } from './eap-calculator/eap-calculator.component';
import { SettingsComponent } from './settings/settings.component';
import { EditHomeworkComponent } from './edit-homework/edit-homework.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


import { TaskService } from './task-service/task.service';
import { MessageService } from './message-service/message.service';
import { SubjectService } from './subject-service/subject.service';
import { UserService } from './user-service/user.service';
import { NotificationService } from './notification-service/notification.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthService } from './auth-service/auth.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { SettingsService } from './settings-service/settings.service';
import { AdminGuardService } from './admin-guard/admin-guard.service';
import { ReportHomeworkComponent } from './report-homework/report-homework.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyD98RBDQEBAKyyxGv2oZ1-oKECwBU5NUew',
  authDomain: 'ngfbauth-594bd.firebaseapp.com',
  databaseURL: 'https://ngfbauth-594bd.firebaseio.com',
  projectId: 'ngfbauth-594bd',
  storageBucket: 'ngfbauth-594bd.appspot.com',
  messagingSenderId: '1017467839160'
};

@NgModule
({
  declarations: [
    AppComponent,
    ShowHomeworksComponent,
    AddHomeworksComponent,
    AddSubjectComponent,
    CreateSubjectComponent,
    MessagesComponent,
    TasksComponent,
    NotificationsComponent,
    EapCalculatorComponent,
    SettingsComponent,
    EditHomeworkComponent,
    AdminPanelComponent,
    ReportHomeworkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFontAwesomeModule,
    MatDialogModule
  ],
  providers: [
    TaskService,
    MessageService,
    SubjectService,
    UserService,
    NotificationService,
    Title,
    DatePipe,
    AuthService,
    AngularFireAuth,
    AuthGuardService,
    SettingsService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
