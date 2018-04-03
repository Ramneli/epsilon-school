import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';

@Component({
 	 selector: 'app-show-homeworks',
  templateUrl: './show-homeworks.component.html',
  styleUrls: ['./show-homeworks.component.css']
})

export class ShowHomeworksComponent implements OnInit {
	

	constructor(private taskService: TaskService) { }

  homeworks = [];

  getHomeworks(){
    this.taskService.getHomeworks(1)
      .subscribe(data => {
          this.displayHomeworks(data);
      });
  }

  displayHomeworks(homeworks) {
    console.log(this.homeworks);
    for (let i = 0; i < homeworks.length; i++) {
      this.homeworks.push(homeworks[i].name);
      
    }
  }

    createTable(tableData) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("homeworkTable");
    if (!table) {
      var headers = ["Aine", "Aine tüüp", "Ülesanne", "Õppejõud", "Tähtaeg"];
      var listWidth = ["standardColWidth", "standardColWidth", "taskColWidth", "standardColWidth", "standardColWidth"];
      var table: HTMLTableElement = <HTMLTableElement> document.createElement("Table");
      table.setAttribute("id", "homeworkTable");
      var tableHeader = document.createElement("tr");
      for (var i = 0; i < headers.length; i++) {
        var cell = document.createElement("th");
        cell.setAttribute("id", listWidth[i]);
        cell.textContent = headers[i];
        tableHeader.appendChild(cell);
      }
      table.appendChild(tableHeader);
    }
    var tr = table.insertRow();

    var header_name = tr.insertCell();
    var header_type = tr.insertCell();
    var header_task = tr.insertCell();
    var header_lecturer_name = tr.insertCell();
    var header_deadline = tr.insertCell();

    header_name.appendChild(document.createTextNode(tableData.name));
    header_type.appendChild(document.createTextNode(tableData.type));
    header_task.appendChild(document.createTextNode(tableData.task));
    header_lecturer_name.appendChild(document.createTextNode(tableData.lecturer_name));
    header_deadline.appendChild(document.createTextNode(tableData.deadline));
      document.getElementById("tableDiv").appendChild(table);
  }

  deleteTable() {
    var table = document.getElementById("homeworkTable");
    if (table) {
      table.parentNode.removeChild(table);
    }
  }
  createTableWithNoHomeworks() {
    let table = document.getElementById("homeworkTable");
    if (!table) {
      table = document.createElement("Table");
      table.setAttribute("id", "homeworkTable");

      var tableHeader = document.createElement("tr");
      var cell_message = document.createElement("th");
      var tableRow = document.createElement("tr");
      var cell_message_content = document.createElement("tr");

      cell_message.textContent = "Teade";
      cell_message_content.textContent = "Ülesandeid ei ole.";
      
      tableHeader.appendChild(cell_message);
      tableRow.appendChild(cell_message_content);
      table.appendChild(tableHeader);
      table.appendChild(tableRow);
      document.getElementById("tableDiv").appendChild(table);
    }
  }



  	ngOnInit() {
        this.getHomeworks();
  	}

  
}
