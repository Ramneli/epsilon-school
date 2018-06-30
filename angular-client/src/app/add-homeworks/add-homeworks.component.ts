import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-add-homeworks',
  templateUrl: './add-homeworks.component.html',
  styleUrls: ['./add-homeworks.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'et'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})

export class AddHomeworksComponent implements OnInit {

  taskTypes = ['Ülesanne', 'Kontrolltöö'];
  allSubjectNames = [];
  allSubjectIds = [];
  userDeadline;
  userId = 'default';

  constructor(private taskService: TaskService,
              private authService: AuthService) {
  }

  static resetPageForm() {
    let subjectCreationForm: HTMLFormElement;
    subjectCreationForm = <HTMLFormElement>document.getElementById('addTaskForm');
    subjectCreationForm.reset();
    const objectsNeedToValidate = document.getElementsByClassName('was-validated');
    objectsNeedToValidate[0].className = 'needs-validation';
  }

  getSubjects() {
    this.taskService.getSubjects(this.userId)
      .subscribe(data => {
        this.displayHomeworks(data);
      });
  }

  displayHomeworks(homeworks) {
    console.log(homeworks);
    for (let i = 0; i < homeworks.length; i++) {
      this.allSubjectNames.push(homeworks[i].name + ' (' + homeworks[i].lecturer_name + ')');
      this.allSubjectIds.push(homeworks[i].id);

    }
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

  addHomework(userSubjectID, userDescription, none, taskType, lessonType) {
    const userData = {
      subject_id: userSubjectID,
      description: userDescription,
      deadline: this.userDeadline,
      type: taskType,
      author: this.getUser(),
      taskClass: lessonType
    };
    console.log(userData);
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
      this.taskService.addHomework(userData)
        .subscribe(queryResult => {
          console.log(queryResult);

        });
      this.displaySuccessAlert();

      AddHomeworksComponent.resetPageForm();

    }
  }

  displaySuccessAlert() {
    const successMsgDiv = document.createElement('div');
    successMsgDiv.setAttribute('id', 'successMsgDiv');
    successMsgDiv.setAttribute('class', 'alert alert-success');
    successMsgDiv.appendChild(document.createTextNode('Kodune ülesanne lisatud.'));

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

  isAuthenticated() {
    return this.authService.getAuth();
  }

  checkIfUserExists() {
    return this.taskService.checkIfUserExists(this.userId).subscribe();
  }

  getUser() {
    return this.authService.getUserId();
  }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.userId = this.authService.getUserId();
      this.checkIfUserExists();
      this.getSubjects();
    }
  }
}
