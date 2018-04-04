import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task-service/task.service';

@Component({
 	selector: 'app-show-homeworks',
  	templateUrl: './show-homeworks.component.html',
  	styleUrls: ['./show-homeworks.component.css']
})

export class ShowHomeworksComponent implements OnInit {
	

	constructor(private taskService: TaskService) { }

  	subjects = [];
  	subjectIDs = [];

	getSubjects() {
	    this.taskService.getSubjects(1)
	        .subscribe(data => {
	        	console.log(data);
	        this.getHomeworkNamesAndIDs(data);
	    });
	}

  	getSubjectHomeworksDetails(subjectId) {
		this.taskService.getSubjectDetails(subjectId)
	        .subscribe(data => {
	        	this.parseData(data);
	    });
	}

	parseData(subjectDetails) {
		console.log(subjectDetails);
		let tableData = {
			name: subjectDetails.name,
			lecturer_name: subjectDetails.lecturer_name,
			subject_code: subjectDetails.code,
			subject_id: subjectDetails.id,
			type: subjectDetails.type
		};
		this.taskService.getHomeworks(tableData.subject_id)
			.subscribe(data => {
				if (data.length != 0) {
					this.deleteTable();
					for (var i = 0; i < data.length; i++) {
						tableData.task = data[i].description;
						tableData.deadline = data[i].deadline;
						this.createTable(tableData);
					}
				} else {
					this.deleteTable();
					this.createTableWithNoHomeworks();
				}
				console.log(data.length);
			})
	}
	/*asd(data) {
		console.log(data.length);
	}*/

	/*getaHomeworks(tableData) {
		let client = new HttpClient();
		let parsedData = "";
	    client.fetch('http://localhost:8080/task/get/' + tableData.subject_id, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				console.log("DATA: " + data);
				if (data.length != 0) {
					this.deleteTable();
					for (var i = 0; i < data.length; i++) {
						tableData.task = data[i].description;
						tableData.deadline = data[i].deadline;
						this.createTable(tableData);
					}
				} else {
					this.deleteTable();
					this.createTableWithNoHomeworks();
				}
	    	});
	}*/


    getHomeworkNamesAndIDs(subjects) {
	    for (let i = 0; i < subjects.length; i++) {
	        this.subjects.push(subjects[i].name);
	        this.subjectIDs.push(subjects[i].id)
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

	deleteTable() {
	    var table = document.getElementById("homeworkTable");
	    if (table) {
	        table.parentNode.removeChild(table);
	    }
    }


  	ngOnInit() {
        this.getSubjects();
  	}

  
}
