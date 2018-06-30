import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../message-service/message.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class SubjectService {


  constructor(private messageService: MessageService,
              private http: HttpClient,
              private authService: AuthService) {
  }


  addSubjectToTimetable(addSubjectJson) {
    const timetableUrl = 'http://localhost:8080/timetable/addTo';
    return this.http.post(timetableUrl, addSubjectJson);

  }

  searchSubject(keyword) {
    const encodedKeyword = encodeURI(keyword);
    const searchSubjectUrl = 'http://localhost:8080/subject/search?searchKeyword=' + encodedKeyword;
    return this.http.post(searchSubjectUrl, '');

  }

  postEapSubject(eapSubject) {
    const eapSubjectPostUrl = 'http://localhost:8080/eapsubject/add';
    return this.http.post(eapSubjectPostUrl, eapSubject);
  }

  getAverageGrade() {
    const eapSubjectPostUrl = 'http://localhost:8080/user/getgrade?uid=' + this.authService.getUserId();
    return this.http.post(eapSubjectPostUrl, '');
  }

  removeEapSubject(id) {
    const userId = this.authService.getUserId();
    const eapSubjectPostUrl = 'http://localhost:8080/eapsubject/remove?id='
      + String(id) + '&uid=' + userId;
    return this.http.post(eapSubjectPostUrl, '');
  }

  getUserEapSubjects() {
    const subjectsUrl = 'http://localhost:8080/eapsubject/get/' + this.authService.getUserId();
    return this.http.post(subjectsUrl, '');
  }

  getAllSubjects() {
    const subjectsUrl = 'http://localhost:8080/subject/all';
    return this.http.post(subjectsUrl, '');
  }

  createNewSubject(createSubjectJson) {
    const subjectsUrl = 'http://localhost:8080/subject/add';
    return this.http.post(subjectsUrl, createSubjectJson);
  }

  removeSubjectFromTimetable(removeSubjectJson) {
    const removeSubjectUrl = 'http://localhost:8080/timetable/remove';
    return this.http.post(removeSubjectUrl, removeSubjectJson);
  }

  /**
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(failedOperationName: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${failedOperationName} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('Asd: ' + message + '.');
  }

}
