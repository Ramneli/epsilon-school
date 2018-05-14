import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings-service/settings.service';
import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';
import { SubjectService } from '../subject-service/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    settingsLoaded : boolean = false;
    subjects = [];
    subjectIDs = [];
    private userId:string;

    constructor(private settingsService: SettingsService,
                private taskService: TaskService,
                private authService: AuthService,
                private subjectService: SubjectService,
                private router: Router) {
	}


	saveSettings(deadline) {
		var showOldTasks = 0;
		if (deadline.checked) showOldTasks = 1;
		this.settingsService.saveSettings(String(showOldTasks)).subscribe(res => {
			this.displaySuccessAlert('Seaded on salvestatud!');
		});
	}

	loadSettings() {
		
	}

    displaySuccessAlert(message) {
        var successAlert = document.createElement("div");
            successAlert.setAttribute('id', "successAlert");
            successAlert.setAttribute("class", "alert alert-success");
            successAlert.appendChild(document.createTextNode(message));

            var alertDiv = document.getElementById('alert');
            alertDiv.appendChild(successAlert);
            this.startAlertTimeout();
        }

	startAlertTimeout() {
	    setTimeout(function () {
	    	var successAlert = document.getElementById('successAlert');
	    	successAlert.parentNode.removeChild(successAlert);
	    }, 3000);
    }
    
    getSubjects() { 
	    this.taskService.getSubjects(this.userId)
	        .subscribe(subjects => {
	        this.getHomeworkNamesAndIDs(subjects);
	    });
    }
    
    getHomeworkNamesAndIDs(subjects) {
	    for (let i = 0; i < subjects.length; i++) {
	        this.subjects.push(subjects[i].name + " (" + subjects[i].lecturer_name + ")");
	        this.subjectIDs.push(subjects[i].id)
		}
    }
    
    deleteSubject(subjectId) {
        console.log(this.subjectIDs);
        console.log(this.subjects);
        console.log(subjectId);
        let userData = {
            uid: this.userId,
            subject_id: subjectId
        };
        
        this.subjectService.removeSubjectFromTimetable(userData)
            .subscribe( res => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate(['/homeworks/settings']);
                });
            }
        );
    }

    ngOnInit() {
        this.settingsService.loadSettings().subscribe(data => {
            var showOldTasks : boolean = false;
            var settings = JSON.parse(JSON.stringify(data));
            if(settings.oldTasks == 1) showOldTasks = true;
            var oldTasksSetting : HTMLInputElement;
                console.log("hi!");
                oldTasksSetting = <HTMLInputElement> document.getElementById("oldTasks");
                oldTasksSetting.checked = showOldTasks;
                this.settingsLoaded = true;				
        });
        this.userId = this.authService.getUserId();
        this.taskService.getSubjects(this.userId).subscribe(subjects => {
            this.getHomeworkNamesAndIDs(subjects);
        });
    }

}
