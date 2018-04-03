import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../subject-service/subject.service';
import { TimetableService } from '../timetable-service/timetable.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService,
              private timetableService: TimetableService) { }

  allSubjectNames = [];
  allSubjectIds = [];

  userData = {
    user_id: "1",
    subject_id: "11"
  };

  getAllSubjects() {
    this.subjectService.getAllSubjects()
      .subscribe(data => {
          this.displayAllSubjects(data);
      });
  }

  addSubjectToTimetable(id) {
    this.timetableService.addSubjectToTimetable(this.userData).subscribe();
  }

  displayAllSubjects(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      this.allSubjectNames.push(data[i].name);
      this.allSubjectIds.push(data[i].id);
      
    }
  }

  ngOnInit() {
  	this.getAllSubjects();
  }

}
