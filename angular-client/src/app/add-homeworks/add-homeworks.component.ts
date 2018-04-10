import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatFormFieldControl } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';


@Component({
    selector: 'app-add-homeworks',
    templateUrl: './add-homeworks.component.html',
    styleUrls: ['./add-homeworks.component.css'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'et'},
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
})
export class AddHomeworksComponent implements OnInit {

  	constructor(private taskService: TaskService,
                private authService: AuthService) { }

    taskTypes = ["Ülesanne", "Kontrolltöö"];
    allSubjectNames = [];
    allSubjectIds = [];
    userDeadline;
    userId = "default";

	getSubjects() {
        this.taskService.getSubjects(this.userId)
            .subscribe(data => {
                this.displayHomeworks(data);
        });
    }

    displayHomeworks(homeworks) {
        console.log(homeworks)
        for (let i = 0; i < homeworks.length; i++) {
            this.allSubjectNames.push(homeworks[i].name);
            this.allSubjectIds.push(homeworks[i].id);

        }
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.userDeadline = `${event.value}`;
    }

    addHomework(userSubjectID, userDescription, none, taskType) {
        let userData = {
            subject_id: userSubjectID,
            description: userDescription,
            deadline: this.userDeadline,
            type: taskType
        }
        console.log("SIIN ON TASK TYPE:");
        console.log(taskType);
        console.log(none);

        this.taskService.addHomework(userData)
        	.subscribe(queryResult => {
            if (!queryResult) {
            	alert('Please check your inputs!');
            }
        });

    }

    isAuthenticated() {
        return this.authService.getAuth();
    }
    checkIfUserExists(this.userId) {
        return this.taskService.checkIfUserExists().subscribe();
    }

    ngOnInit() {
        if (this.isAuthenticated()) {
            this.userId = this.authService.getUserId();
            var checkUser = this.checkIfUserExists;
            console.log(this.userId);
            this.getSubjects();
        }
    }
}
