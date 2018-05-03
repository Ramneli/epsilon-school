import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';
import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService,
              private taskService: TaskService,
              private authService: AuthService,
              private router : Router
              ) { }

  allSubjectNames = [];
  allSubjectIds = [];

  userId = "default";

  getAllSubjects() {
    this.subjectService.getAllSubjects()
      .subscribe(allSubjects => {
          this.pushAllSubjectsToLists(allSubjects);
      });
  	}

  
    addSubjectToTimetable(subjectId) {
        const userData = {
        uid: this.userId,
        subject_id: subjectId
        };
        this.subjectService.addSubjectToTimetable(userData).subscribe(d => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/homeworks']);
            });
        });
        this.displaySuccessAlert('Aine tunniplaani lisatud.');
    }

    searchSubject(keyword) {
        this.subjectService.searchSubject(keyword).subscribe(res => {
            this.pushAllSubjectsToLists(res);
            var dataLength = Object.keys(res).length;
            if (dataLength != 0) {
                Object.keys(this.allSubjectNames).forEach(i => {
                    let subjectButton = document.createElement("button");
                    subjectButton.setAttribute("id", this.allSubjectIds[i]);
                    subjectButton.appendChild(document.createTextNode(this.allSubjectNames[i]));
                    subjectButton.addEventListener('click', e => {
                        this.addSubjectToTimetable(this.allSubjectIds[i]);
                    })
                    document.getElementById("subjectButtons").appendChild(subjectButton);
                });
            } else {
                this.displaySuccessAlert('Ühtegi ainet ei leitud.');
            }
            
            console.log(res);
        });
    }

  	pushAllSubjectsToLists(allSubjects) {
    	console.log(allSubjects);
    for (let i = 0; i < allSubjects.length; i++) {
	      	this.allSubjectNames.push(allSubjects[i].name);
	     	this.allSubjectIds.push(allSubjects[i].id);
    }
  }

    checkIfUserExists() {
        return this.taskService.checkIfUserExists(this.userId).subscribe();
    }

    isAuthenticated() {
        return this.authService.getAuth();
    }

    displaySuccessAlert(message) {
        var successMsgDiv = document.createElement('div');
        successMsgDiv.setAttribute('id', "successMsgDiv");
        successMsgDiv.setAttribute("class", "alert alert-success");
        successMsgDiv.appendChild(document.createTextNode(message));

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
        if (this.isAuthenticated()) {
            this.userId = this.authService.getUserId();
            var checkUser = this.checkIfUserExists();
            this.getAllSubjects();
        }
    }
	    
}
