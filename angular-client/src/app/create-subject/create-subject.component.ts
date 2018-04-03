import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';



@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  	constructor(private subjectService: SubjectService) { }


	addSubjectToTimetable(userSubjectName, userSubjectCode, userLecturerName, userChoice) {
		let userData = {
			name: userSubjectName,
			code: userSubjectCode,
			lecturer_name: userLecturerName,
			type: userChoice
		};
		console.log(userSubjectName, userSubjectCode, userLecturerName, userChoice);
		this.subjectService.createNewSubject(userData).subscribe();

	}


	ngOnInit() {
	}

}
