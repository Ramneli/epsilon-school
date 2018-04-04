import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';
import { TaskService } from '../task-service/task.service';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService,
              private taskService: TaskService) { }

  allSubjectNames = [];
  allSubjectIds = [];

  /**
    Sisselogimisel on siia "2" asemele userid saada.
  */
  
  userId = "1";

  getAllSubjects() {
    this.subjectService.getAllSubjects()
      .subscribe(allSubjects => {
          this.pushAllSubjectsToLists(allSubjects);
      });
  	}

  
  addSubjectToTimetable(subjectId) {
    const userData = {
      user_id: this.userId,
      subject_id: subjectId
    };
    this.subjectService.addSubjectToTimetable(userData).subscribe();
  }

  	pushAllSubjectsToLists(allSubjects) {
    	console.log(allSubjects);
    for (let i = 0; i < allSubjects.length; i++) {
	      	this.allSubjectNames.push(allSubjects[i].name);
	     	this.allSubjectIds.push(allSubjects[i].id);
    }
  }

  	ngOnInit() {
	    this.getAllSubjects();
	}

}
