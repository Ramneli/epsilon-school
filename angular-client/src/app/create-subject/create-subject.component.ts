import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  	constructor(private subjectService: SubjectService, private authService : AuthService) { }

	addSubjectToTimetable(userSubjectName, userSubjectCode, userLecturerName, userChoice) {
		let userData = {
			name: userSubjectName,
			code: userSubjectCode,
			lecturer_name: userLecturerName,
			type: userChoice
		};

		console.log(userSubjectName, userSubjectCode, userLecturerName, userChoice);

		if (userSubjectName.length == 0) {
			alert('Please check your inputs.');
		} else if (userSubjectCode.length == 0) {
			alert('Please check your inputs.');
		} else if (userLecturerName.length == 0) {
			alert('Please check your inputs.');
		} else {
			this.subjectService.createNewSubject(userData).subscribe();
			alert("Aine loodud.");
		}
	}

	ngOnInit() {
    	console.log(this.authService.getUserId());
	}
}
