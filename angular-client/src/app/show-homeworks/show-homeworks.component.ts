import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';
import { SubjectService } from '../subject-service/subject.service';

@Component({
 	selector: 'app-show-homeworks',
  	templateUrl: './show-homeworks.component.html',
  	styleUrls: ['./show-homeworks.component.css']
})

export class ShowHomeworksComponent implements OnInit {

	constructor(private taskService: TaskService, private authService : AuthService, 
		private subjectService: SubjectService) {}

	subjectIDs = [];
	subjects = [];
	private userId:string;
	public showOldTasks = false;
	public currentSubjectId = -1;
	tasksButtonText = "Näita vanemaid ülesandeid.";

	isAuthenticated() {
	    return this.authService.getAuth();
	}

	getSubjects() {
	    this.taskService.getSubjects(this.userId)
	        .subscribe(subjects => {
	        this.getHomeworkNamesAndIDs(subjects);
	    });
	}

  	getSubjectHomeworksDetails(subjectId) {
		this.currentSubjectId = subjectId;
		this.taskService.getTasksWithSubject(subjectId, this.showOldTasks)
	        .subscribe(subjectWithTasks => {
	        	this.showHomeworks(subjectWithTasks);
	    });
	}

	showHomeworks(subjectWithTasks) {
		var dataLength = Object.keys(subjectWithTasks.tasks).length;
		this.deleteTable();
		if (dataLength != 0) {
			this.createTable(subjectWithTasks);
		} else {
			this.createTableWithNoHomeworks();
		}
	}

    getHomeworkNamesAndIDs(subjects) {
	    for (let i = 0; i < subjects.length; i++) {
	        this.subjects.push(subjects[i].name);
	        this.subjectIDs.push(subjects[i].id)
	    }
	}

    createTable(tableData) {
	    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("homeworkTable");
	    if (!table) {
			table = this.makeNewTable();
		}
		console.log(tableData);
		this.populateTable(table, tableData);
	}
	
	makeNewTable() {
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
		return table;
	}

	populateTable(table, tableData) {
		for (var i = 0; i < Object.keys(tableData.tasks).length; i++) {
			var tr = table.insertRow();

			var header_name = tr.insertCell();
			var header_type = tr.insertCell();
			var header_task = tr.insertCell();
			var header_lecturer_name = tr.insertCell();
			var header_deadline = tr.insertCell();
			
			var taskTypeNode = document.createElement("p");
			taskTypeNode.setAttribute("style", "display: inline;")

			if (tableData.tasks[i].task_type === "Kontrolltöö") {
				taskTypeNode.setAttribute("style", "color: red;");
				taskTypeNode.appendChild(document.createTextNode("Kontrolltöö: "));
			} else {
				taskTypeNode.setAttribute("style", "color: black;");
				taskTypeNode.appendChild(document.createTextNode("Ülesanne: "));
			}

			header_name.appendChild(document.createTextNode(tableData.subject_name));
			header_type.appendChild(document.createTextNode(tableData.subject_type));
			header_task.appendChild(taskTypeNode);
			header_task.appendChild(document.createTextNode(tableData.tasks[i].task_description));
			header_lecturer_name.appendChild(document.createTextNode(tableData.lecturer_name));
			header_deadline.appendChild(document.createTextNode(tableData.tasks[i].task_deadline));
		}
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

	setOldTasks() {
		this.showOldTasks = !this.showOldTasks;
		this.getSubjectHomeworksDetails(this.currentSubjectId);
		if (this.showOldTasks) {
			this.tasksButtonText = "Näita vähem ülesandeid";
		} else {
			this.tasksButtonText = "Näita vanemaid ülesandeid";
		}
	}

	displayTasksControlButton() {
		return this.currentSubjectId != -1;
	}

	checkIfUserExists() {
		return this.taskService.checkIfUserExists(this.userId).subscribe();
	}
	
  	ngOnInit() {
		if (this.isAuthenticated()) {
			this.userId = this.authService.getUserId();
			var checkUser = this.checkIfUserExists();
			console.log(this.userId);
			this.getSubjects();
		}
  	}
}
