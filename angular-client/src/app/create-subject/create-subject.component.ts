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

			//var objectsToValidate = document.getElementsByClassName("was-validated");
			//objectsToValidate[0].className = "needs-validation";

			this.subjectService.createNewSubject(userData).subscribe();
			this.displaySuccessAlert();

			var subjectCreationForm : HTMLFormElement;
		    subjectCreationForm = <HTMLFormElement>document.getElementById("createSubjectForm");
			subjectCreationForm.reset();
		}
	}

	displaySuccessAlert() {
		var successMsgDiv = document.createElement('div');
		successMsgDiv.setAttribute('id', "successMsgDiv");
		successMsgDiv.setAttribute("class", "alert alert-success");
		successMsgDiv.appendChild(document.createTextNode('Aine edukalt loodud!'));

		var validationFormDiv = document.getElementById('validation-form');
		validationFormDiv.appendChild(successMsgDiv);
		this.startAlertTimeout();
	}

	startAlertTimeout() {
	    setTimeout(function () {
	    	var successMsgDiv = document.getElementById('successMsgDiv');
	    	successMsgDiv.parentNode.removeChild(successMsgDiv);
	    }, 3000);
	  } 

	ngOnInit() {
    	
	}
}
