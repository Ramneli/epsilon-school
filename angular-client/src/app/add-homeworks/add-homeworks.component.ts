import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task-service/task.service';


@Component({
  selector: 'app-add-homeworks',
  templateUrl: './add-homeworks.component.html',
  styleUrls: ['./add-homeworks.component.css']
})
export class AddHomeworksComponent implements OnInit {

  	constructor(private taskService: TaskService) { }

    allSubjectNames = [];
    allSubjectIds = [];

	getSubjects() {
    this.taskService.getSubjects(1)
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

  addHomework(userChoice, userDescription, userDeadline) {
    let userData = {
      subject_id: userChoice,
      description: userDescription,
      deadline: userDeadline
    }
    this.taskService.addHomework(userData).subscribe();

  }

  ngOnInit() {
  	this.getSubjects();
  }

}
