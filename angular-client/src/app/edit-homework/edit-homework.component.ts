import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatFormFieldControl } from '@angular/material';
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
        { provide: MAT_DATE_LOCALE, useValue: 'et'},
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})

export class EditHomeworkComponent implements OnInit {

    constructor(private authService: AuthService,
                private taskService: TaskService) { }

    userDeadline;
    
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.userDeadline = `${event.value}`;
        var datepicker = document.getElementById("datepickerNothingSelected");
        //datepicker.id = "datepickerNotTouched";
        datepicker.id = "datepickerCorrect";
        var errorMessage = document.getElementById("error-message");
        while (errorMessage.firstChild) {
            errorMessage.removeChild(errorMessage.firstChild);
        }

    }

    getUser() {
        return this.authService.getUserId();
    }

    updateHomework(userDescription, userDeadline) {
        var cookieData = localStorage.getItem("currentTask");
        var subjectId = cookieData.split(":")[1];
        let userData = {
            subject_id: subjectId,
            description: userDescription,
            deadline: this.userDeadline,
            author: this.getUser()
        }
        
        if (userDescription.length == 0 || this.userDeadline == null) {
            if (this.userDeadline == null) {
                var datepicker = document.getElementById("datepickerNotTouched");
                datepicker.id = "datepickerNothingSelected";
                var errorMessageDiv = document.createElement('div');
                errorMessageDiv.setAttribute('id', "errorMessageDiv");
                errorMessageDiv.setAttribute('class', "errorMessageAlert")
                errorMessageDiv.appendChild(document.createTextNode('Palun vali tähtaeg.'));
                var errorMessageElement = document.getElementById("error-message");
                errorMessageElement.appendChild(errorMessageDiv);
            }
            var objectsToValidate = document.getElementsByClassName("needs-validation");
            objectsToValidate[objectsToValidate.length - 1].className = "was-validated";
        } else {
            this.taskService.updateHomework(userData).subscribe(queryResult => {
                console.log(queryResult);
                console.log(userData);
            });
            this.resetPageForm();
            this.displaySuccessAlert();
            
        
        }
    }

    resetPageForm() {
        var subjectCreationForm : HTMLFormElement;
        subjectCreationForm = <HTMLFormElement>document.getElementById("addTaskForm");
        subjectCreationForm.reset();
        var objectsNeedToValidate = document.getElementsByClassName("was-validated");
        objectsNeedToValidate[0].className = "needs-validation";
    }

    displaySuccessAlert() {
        var successMsgDiv = document.createElement('div');
        successMsgDiv.setAttribute('id', "successMsgDiv");
        successMsgDiv.setAttribute("class", "alert alert-success");
        successMsgDiv.appendChild(document.createTextNode('Kodune ülesanne uuendatud.'));

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
        var element : HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("description");
        var currentTask = localStorage.getItem("currentTask").split(":")[0];
		element.value = currentTask;
	}
}
