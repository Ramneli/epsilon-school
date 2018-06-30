import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../message-service/message.service';

@Injectable()
export class TaskService {

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  getSubjects(id) {
    const getSubjectsUrl = 'http://localhost:8080/timetable/get';
    const url = `${getSubjectsUrl}/${id}`;
    return this.http.post(url, '');
  }

  addHomework(addHomeworkData) {
    const addHomeworkUrl = 'http://localhost:8080/task/add';
    return this.http.post(addHomeworkUrl, addHomeworkData);
  }

  getTasksWithSubject(subjectId, uid) {
    const getHomeworksUrl = 'http://localhost:8080/task/getAll';
    const url = `${getHomeworksUrl}/${subjectId}?uid=${uid}`;
    return this.http.post(url, '');
  }

  checkIfUserExists(userId) {
    const checkUserUrl = 'http://localhost:8080/user/checkuser?uid=';
    const url = `${checkUserUrl}${userId}`;
    return this.http.get(url);
  }

  updateHomework(updateHomeworkData) {
    const updateHomeworkUrl = 'http://localhost:8080/task/update';
    return this.http.post(updateHomeworkUrl, updateHomeworkData);
  }

  deleteHomework(taskIdJson) {
    const deleteHomeworkUrl = 'http://localhost:8080/task/delete';
    return this.http.post(deleteHomeworkUrl, taskIdJson);
  }

  reportHomework(reportJson) {
    const reportHomeworkUrl = 'http://localhost:8080/report/add';
    return this.http.post(reportHomeworkUrl, reportJson);
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
    this.messageService.add('HeroService: ' + message + '.');
  }
}
