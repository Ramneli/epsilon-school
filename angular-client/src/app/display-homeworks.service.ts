import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Homework } from './homework';
import { HOMEWORKS } from './homeworks';
import { MessageService } from './message.service';

@Injectable()
export class DisplayHomeworksService {

 	constructor(private messageService: MessageService,
 				private http: HttpClient) { }

 	dummy = {};

	getHomeworks(id: number) {
		const url = `${this.homeworksUrl}/${id}`;
		const headers = new Headers();
		headers.append('Content-Tpye', 'application/json; charset=utf-8');
		let observable = Observable.create(observer => {
            let users = [
	            {
	            	id: "1",
	            	name: "Programmeerimine",
	            	code: "IDK0102",
	            	lecturer_name: "Martin Rebane"
	            },
	            {
	                id: "2",
	            	name: "Matemaatiline Analüüs I",
	            	code: "YML0053",
	            	lecturer_name: "Liivi Kluge"
	            }];
            observer.next(users);
            console.log("am done");
            observer.complete();
       	});

		

    		/*observable.subscripe((data)=>{
    			console.log(data); // users array display
    		});*/
    		/*return this.http.post(url, JSON.stringify(this.dummy));*/
			/*.pipe(
			tap(_ => this.log(`fetched homeworks id=${id}`)),
			catchError(this.handleError('getHomeworks', []))
			);*/
		return observable;
		
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

	private homeworksUrl = 'http://localhost:8080/subject/get';
}
