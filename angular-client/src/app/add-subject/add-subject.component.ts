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
    selectedSearchSubjectId = -1;


    userId = "default";

    getAllSubjects() {
        this.subjectService.getAllSubjects()
        .subscribe(allSubjects => {
            this.pushAllSubjectsToLists(allSubjects);
        });
    }

    
    addSubjectToTimetable(subjectId) {
        if (subjectId == -1) {
            this.displayAlert('Vali aine enne lisamist.', "danger");
        }

        const userData = {
        uid: this.userId,
        subject_id: subjectId
        };
        this.subjectService.addSubjectToTimetable(userData).subscribe(d => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/homeworks']);
            });
        });
        this.displayAlert('Aine tunniplaani lisatud.', "success");
    }

    removeSearchPageChildren() {
        var subjectList = document.getElementById("list");
        while (subjectList.firstChild) {
            subjectList.removeChild(subjectList.firstChild);
        }

        var subjectButtonDiv = document.getElementById("addButtonDiv");
        while (subjectButtonDiv.firstChild) {
            subjectButtonDiv.removeChild(subjectButtonDiv.firstChild);
        }
    }

    searchSubject(keyword) {
        this.subjectService.searchSubject(keyword).subscribe(res => {
            console.log(res);
            var dataLength = Object.keys(res).length;
            if (dataLength != 0) {
                this.removeSearchPageChildren();
                Object.keys(res).forEach(i => {
                    let subjectButton = document.createElement("button");
                    subjectButton.setAttribute("id", res[i].id);
                    subjectButton.setAttribute("class", "subjectButton");
                    subjectButton.appendChild(document.createTextNode(res[i].name + " (" + res[i].lecturer_name + ")"));
                    document.getElementById("list").appendChild(subjectButton);
                    document.getElementById("list").appendChild(document.createElement("br"));
                    subjectButton.addEventListener('click', e => {
                        this.selectedSearchSubjectId = res[i].id;
                        console.log(this.selectedSearchSubjectId);
                    })
                });
                let addButton = document.createElement("button");
                    addButton.setAttribute("class", "btn btn-primary");
                    addButton.setAttribute("style", "width: 100%");
                    addButton.id = "addButton";
                    addButton.appendChild(document.createTextNode("Lisa aine tunniplaani"));
                    addButton.addEventListener('click', e => {
                        this.addSubjectToTimetable(this.selectedSearchSubjectId);
                    });
                    document.getElementById("addButtonDiv").appendChild(addButton);
            } else {
                this.displayAlert('Ühtegi ainet ei leitud.', "danger");
            }
        });
    }

    pushAllSubjectsToLists(allSubjects) {
        console.log(allSubjects);
        for (let i = 0; i < allSubjects.length; i++) {
                this.allSubjectNames.push(allSubjects[i].name + "(" + allSubjects.type + ")");
                this.allSubjectIds.push(allSubjects[i].id);
        }
    }

    checkIfUserExists() {
        return this.taskService.checkIfUserExists(this.userId).subscribe();
    }

    isAuthenticated() {
        return this.authService.getAuth();
    }

    displayAlert(message, alertType) {
        var successMsgDiv = document.createElement('div');
        successMsgDiv.setAttribute('id', "successMsgDiv");
        if (alertType == "success") {
            successMsgDiv.setAttribute("class", "alert alert-success");
        } else if (alertType == "danger") {
            successMsgDiv.setAttribute("class", "alert alert-danger");
        }
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
