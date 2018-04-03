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

	getHomeworks(id: number) {
		const getHomeworksUrl = 'http://localhost:8080/timetable/get';
		const url = `${getHomeworksUrl}/${id}`;
		const headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		return this.http.post(url, "");
	}

	addHomework(json) {
		const addHomeworkUrl = 'http://localhost:8080/task/add';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		return this.http.post(addHomeworkUrl, json);
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
