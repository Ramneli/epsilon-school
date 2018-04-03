import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';


@Component({
  selector: 'app-add-homeworks',
  templateUrl: './add-homeworks.component.html',
  styleUrls: ['./add-homeworks.component.css']
})
export class AddHomeworksComponent implements OnInit {

  	constructor(private taskService: TaskService) { }

  	homeworks = [];

	getHomeworks() {
    this.taskService.getHomeworks(1)
      .subscribe(data => {
          this.displayHomeworks(data);
      });
  }

  displayHomeworks(homeworks) {
    console.log(homeworks)
    for (let i = 0; i < homeworks.length; i++) {
      this.homeworks.push(homeworks[i].name);
      
    }
  }

  ngOnInit() {
  	this.getHomeworks();

  }

}
