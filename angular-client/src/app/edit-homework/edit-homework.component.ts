import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-edit-homework',
  templateUrl: './edit-homework.component.html',
  styleUrls: ['./edit-homework.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'et'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})

export class EditHomeworkComponent implements OnInit {

  userDeadline;

  constructor(private authService: AuthService,
              private taskService: TaskService) {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.userDeadline = `${event.value}`;
    const datepicker = document.getElementById('datepickerNothingSelected');
    datepicker.id = 'datepickerCorrect';
    const errorMessage = document.getElementById('error-message');
    while (errorMessage.firstChild) {
      errorMessage.removeChild(errorMessage.firstChild);
    }

  }

  getUser() {
    return this.authService.getUserId();
  }

  updateHomework(userDescription) {
    const cookieData = localStorage.getItem('currentTask');
    const taskId = cookieData.split(':')[1];
    const userData = {
      id: taskId,
      description: userDescription,
      deadline: this.userDeadline,
      author: this.getUser()
    };

    if (userDescription.length === 0 || this.userDeadline == null) {
      if (this.userDeadline == null) {
        const datepicker = document.getElementById('datepickerNotTouched');
        datepicker.id = 'datepickerNothingSelected';
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.setAttribute('id', 'errorMessageDiv');
        errorMessageDiv.setAttribute('class', 'errorMessageAlert');
        errorMessageDiv.appendChild(document.createTextNode('Palun vali tähtaeg.'));
        const errorMessageElement = document.getElementById('error-message');
        errorMessageElement.appendChild(errorMessageDiv);
      }
      const objectsToValidate = document.getElementsByClassName('needs-validation');
      objectsToValidate[objectsToValidate.length - 1].className = 'was-validated';
    } else {
      this.taskService.updateHomework(userData).subscribe(queryResult => {
        console.log(queryResult);
        console.log(userData);
      });
      const message = 'Kodune ülesanne uuendatud. Värskendage lehte muudatuste nägemiseks.';
      this.displaySuccessAlert(message);
    }
  }

  deleteHomework() {
    const cookieData = localStorage.getItem('currentTask');
    const taskId = cookieData.split(':')[1];
    const deleteHomeworkJson = {
      id: taskId,
      author: this.getUser()
    };
    this.taskService.deleteHomework(deleteHomeworkJson).subscribe();
    const message = 'Kodune ülesanne kustutatud. Värskendage lehte muudatuste nägemiseks.';
    this.displaySuccessAlert(message);
  }

  displaySuccessAlert(message) {
    const successMsgDiv = document.createElement('div');
    successMsgDiv.setAttribute('id', 'successMsgDiv');
    successMsgDiv.setAttribute('class', 'alert alert-success');
    successMsgDiv.appendChild(document.createTextNode(message));

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
    const element: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById('description');
    element.value = localStorage.getItem('currentTask').split(':')[0];
  }
}
