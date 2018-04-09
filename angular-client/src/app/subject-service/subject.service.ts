import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message-service/message.service';

@Injectable()
export class SubjectService {


 	constructor(private messageService: MessageService,
 				private http: HttpClient) { }


	addSubjectToTimetable(json) {;
		const timetableUrl = 'http://localhost:8080/timetable/addTo';
		return this.http.post(timetableUrl, json);
	
	}

	getAllSubjects() {
		const subjectsUrl = 'http://localhost:8080/subjects';
		return this.http.post(subjectsUrl, "");
	}

	createNewSubject(json) {
		const subjectsUrl = 'http://localhost:8080/subject/add';
		return this.http.post(subjectsUrl, json);
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
		this.messageService.add('Asd: ' + message + '.');
	}

}