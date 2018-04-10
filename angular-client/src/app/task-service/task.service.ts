import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message-service/message.service';

@Injectable()
export class TaskService {

 	constructor(private messageService: MessageService,
 				private http: HttpClient) { }

	getSubjects(id) {
		const getSubjectsUrl = 'http://localhost:8080/timetable/get';
		const url = `${getSubjectsUrl}/${id}`;
		return this.http.post(url, "");
	}

	addHomework(json) {
		const addHomeworkUrl = 'http://localhost:8080/task/add';
		return this.http.post(addHomeworkUrl, json);
	}

	getSubjectDetails(subjectId) {
		const getHomeworksUrl = 'http://localhost:8080/subject/get';
		const url = `${getHomeworksUrl}/${subjectId}`;
		return this.http.post(url, "");
	}

	getHomeworks(subjectId) {
		const getHomeworksUrl = 'http://localhost:8080/task/get';
		const url = `${getHomeworksUrl}/${subjectId}`;
		return this.http.post(url, "");
	}

	getAllTasks() {
		const getHomeworksUrl = 'http://localhost:8080/task/getAll';
		const url = `${getHomeworksUrl}`;
		return this.http.post(url, "");
	}
	
	checkIfUserExists(userId) {
		const checkUserUrl = 'http://localhost:8080/user/checkuser?uid=';
		const url = `${checkUserUrl}${userId}`
		return this.http.get(url);
	}

	/**
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (failedOperationName: string, result?: T) {
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

	private homeworksUrl = 'http://localhost:8080/timetable/get';
}
