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

	addSubjectToTimetable(userSubjectName, userSubjectCode, userLecturerName, userChoice, createSubjectForm) {
		let userData = {
			name: userSubjectName,
			code: userSubjectCode,
			lecturer_name: userLecturerName,
			type: userChoice
		};

		console.log(userSubjectName, userSubjectCode, userLecturerName, userChoice);
		
		
		if (userSubjectName.length == 0 || userSubjectCode.length == 0 || userLecturerName.length == 0) {
			var objectsToValidate = document.getElementsByClassName("needs-validation");
			objectsToValidate[0].className = "was-validated";
		} else {
			this.subjectService.createNewSubject(userData).subscribe();
			this.displayMessage();
			var x : HTMLFormElement;
			x = <HTMLFormElement>document.getElementById("createSubjectForm");
			x.reset();
		}
	}

	displayMessage() {
		var successMsgDiv = document.createElement('div');
		successMsgDiv.setAttribute('id', "successMsgDiv");
		successMsgDiv.setAttribute('style', 'height: 40px; background-color: #39ef54; border-radius: 3px;');
		successMsgDiv.appendChild(document.createTextNode('Success'));
		var div2 = document.getElementById('validation-form');
		div2.appendChild(successMsgDiv);
		this.timeout();
	}

	timeout() {
	    setTimeout(function () {
	    	var successMsgDiv = document.getElementById('successMsgDiv');
	    	successMsgDiv.parentNode.removeChild(successMsgDiv);
	    }, 3000);
	  } 

	ngOnInit() {
    	console.log(this.authService.getUserId());
	}
}
