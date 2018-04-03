import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message-service/message.service';

@Injectable()
export class TimetableService {

  constructor(private messageService: MessageService,
 				private http: HttpClient) { }

 	private timetableUrl = 'http://localhost:8080/timetable/addTo';


	addSubjectToTimetable(json) {;
		const headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		return this.http.post(this.timetableUrl, json);
	
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
