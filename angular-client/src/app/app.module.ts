import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShowHomeworksComponent } from './show-homeworks/show-homeworks.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { DisplayHomeworksService } from './display-homeworks.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

@NgModule
({
  declarations: [
    AppComponent,
    ShowHomeworksComponent,
    AddHomeworksComponent,
    AddSubjectComponent,
    CreateSubjectComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ DisplayHomeworksService, MessageService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
