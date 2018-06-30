import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService) {
  }

  static resetPageForm() {
    let subjectCreationForm: HTMLFormElement;
    subjectCreationForm = <HTMLFormElement>document.getElementById('createSubjectForm');
    subjectCreationForm.reset();
    const objectsNeedToValidate = document.getElementsByClassName('was-validated');
    objectsNeedToValidate[0].className = 'needs-validation';
  }

  addSubjectToTimetable(userSubjectName, userSubjectCode, userLecturerName) {
    const userData = {
      name: userSubjectName,
      code: userSubjectCode,
      lecturer_name: userLecturerName,
    };
    console.log(userData);
    console.log(userSubjectName, userSubjectCode, userLecturerName);


    if (userSubjectName.length === 0 || userSubjectCode.length === 0 || userLecturerName.length === 0) {
      const objectsToValidate = document.getElementsByClassName('needs-validation');
      objectsToValidate[objectsToValidate.length - 1].className = 'was-validated';
    } else {
      this.subjectService.createNewSubject(userData).subscribe();
      this.displaySuccessAlert();
      CreateSubjectComponent.resetPageForm();
    }
  }

  displaySuccessAlert() {
    const successMsgDiv = document.createElement('div');
    successMsgDiv.setAttribute('id', 'successMsgDiv');
    successMsgDiv.setAttribute('class', 'alert alert-success');
    successMsgDiv.appendChild(document.createTextNode('Aine edukalt loodud!'));

    const validationFormDiv = document.getElementById('validation-form');
    validationFormDiv.appendChild(successMsgDiv);
    this.startAlertTimeout();
  }

  startAlertTimeout() {
    setTimeout(function () {
      const successMsgDiv = document.getElementById('successMsgDiv');
      successMsgDiv.parentNode.removeChild(successMsgDiv);
    }, 3000);
  }

  ngOnInit() {
  }
}
