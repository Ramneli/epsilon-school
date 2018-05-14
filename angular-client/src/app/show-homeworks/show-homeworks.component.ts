import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';
import { SubjectService } from '../subject-service/subject.service';

import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { EditHomeworkComponent } from '../edit-homework/edit-homework.component';
import { UserService } from '../user-service/user.service';


@Component({
 	selector: 'app-show-homeworks',
  	templateUrl: './show-homeworks.component.html',
  	styleUrls: ['./show-homeworks.component.css']
})

export class ShowHomeworksComponent implements OnInit {

	subjectIDs = [];
	subjects = [];
	private userId:string;
	public showOldTasks = false;
    public currentSubjectId = -1;
    public tasks = [];
	subjectsLoaded: boolean;
	tasksButtonText = "Näita vanemaid ülesandeid.";

	constructor(private taskService: TaskService,
				private authService : AuthService, 
				private subjectService: SubjectService,
				private router: Router,
				private dialog: MatDialog,
				private userService : UserService) {
					this.subjectsLoaded = false;
					this.userService.getBlockStatus().subscribe(res => {
						if (res == 1) {
							this.authService.logout().then(res => {
								alert("Your account has been disabled. For more info, please contact admin@epsilon.com");
							  });
						}
					});
				}
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
		this.deleteTable();
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
            this.tasks = subjectWithTasks.tasks;
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
		this.subjectsLoaded = true;
	}

    createTable(tableData) {
	    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("homeworkTable");
	    if (!table) {
			table = this.makeNewTable();
		}
		table.setAttribute("class", "tasksTable")
		this.populateTable(table, tableData);
	}
	
	makeNewTable() {
		var headers = ["Aine", "Aine tüüp", "Ülesanne", "Õppejõud", "Tähtaeg", ""];
		var listWidth = ["standardColWidth", "standardColWidth", "taskColWidth", "standardColWidth", "standardColWidth"];
		var table: HTMLTableElement = <HTMLTableElement> document.createElement("Table");
		table.setAttribute("id", "homeworkTable");
		var tableHeader = document.createElement("tr");

		for (var i = 0; i < headers.length; i++) {
			var cell = document.createElement("th");
			cell.setAttribute("id", listWidth[i]);
			cell.setAttribute("class", "tasksTableHeader");
			cell.textContent = headers[i];
			tableHeader.appendChild(cell);
		}

		table.appendChild(tableHeader);
		return table;
	}

	populateTable(table, tableData) {
		console.log(tableData);
		var subjectLecturerHeader = document.createElement("h3");
		subjectLecturerHeader.setAttribute("id", "subjectLecturerHeader");
		var subjectLecturerHeaderText = tableData.subject_name + " - " + tableData.lecturer_name;
		subjectLecturerHeader.appendChild(document.createTextNode(subjectLecturerHeaderText));

		var subjectTypeHeader = document.createElement("h4");
		subjectTypeHeader.setAttribute("id", "subjectTypeHeader");
		var subjectTypeHeaderText = tableData.subject_type;
		subjectTypeHeader.appendChild(document.createTextNode(subjectTypeHeaderText));

		document.getElementById("tableDiv").appendChild(subjectLecturerHeader);
		document.getElementById("tableDiv").appendChild(subjectTypeHeader);

		Object.keys(tableData.tasks).forEach(i => {
			var tr = table.insertRow();

			var header_name = tr.insertCell();
			var header_type = tr.insertCell();
			var header_task = tr.insertCell();
			var header_lecturer_name = tr.insertCell();
			var header_deadline = tr.insertCell();
			var header_edit = tr.insertCell();
			
			var taskTypeNode = document.createElement("p");

			if (tableData.tasks[i].task_type === "Kontrolltöö") {
				taskTypeNode.setAttribute("style", "color: red; display: inline;");
				taskTypeNode.appendChild(document.createTextNode("Kontrolltöö: "));
			} else {
				taskTypeNode.setAttribute("style", "color: black; display: inline;");
				taskTypeNode.appendChild(document.createTextNode("Ülesanne: "));
			}

			header_name.appendChild(document.createTextNode(tableData.subject_name));
			header_type.appendChild(document.createTextNode(tableData.subject_type));
			header_task.appendChild(taskTypeNode);
			header_task.appendChild(document.createTextNode(tableData.tasks[i].task_description));
			header_lecturer_name.appendChild(document.createTextNode(tableData.lecturer_name));
			header_deadline.appendChild(document.createTextNode(tableData.tasks[i].task_deadline));

			if (this.userId == tableData.tasks[i].task_author) {
				var editButton = document.createElement("img");
				editButton.setAttribute("src", "../../assets/images/editbutton.png");
                editButton.setAttribute("width", "17");
                editButton.setAttribute("id", String(i));
                editButton.setAttribute("style", "cursor: pointer;")
                editButton.addEventListener('click', e => {
                    console.log(editButton);
                    var editButtonId = editButton.getAttribute("id");
                    var cookieData: string = this.tasks[parseInt(editButtonId)].task_description + ":" + tableData.tasks[i].task_id;
                    localStorage.setItem("currentTask", cookieData);
                    this.editHomework();
                });
				header_edit.appendChild(editButton);
			}
		});
		document.getElementById("tableDiv").appendChild(table);
    }
    
	editHomework() {
		let dialogRef = this.dialog.open(EditHomeworkComponent, {
			width: '45%',
			height: '75%'
		});
	}

	createTableWithNoHomeworks() {
	    let table = document.getElementById("homeworkTable");

	    if (!table) {
		    table = document.createElement("Table");
		    table.setAttribute("id", "homeworkTable");
			table.setAttribute("class", "tasksTable");
		    var tableHeader = document.createElement("tr");
			var cell_message = document.createElement("th");
			cell_message.setAttribute("class", "tasksTableHeader")
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
		var subjectLecturerHeader = document.getElementById("subjectLecturerHeader");
		var subjectTypeHeader = document.getElementById("subjectTypeHeader");
	    if (table) {
			table.parentNode.removeChild(table);
		}
		if (subjectLecturerHeader) {
			subjectLecturerHeader.parentNode.removeChild(subjectLecturerHeader);
		}
		if (subjectTypeHeader) {
			subjectTypeHeader.parentNode.removeChild(subjectTypeHeader);
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
	
	logout() {
		this.authService.logout();
		localStorage.removeItem("token");
		this.router.navigate(['/']);
	}

	openAddSubjectToTimetableDialog(): void {
    let dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '600px',
      height: '250px'
    });
  }

  isAdmin() : boolean {
	return this.authService.getAdminStatus();
	}

  	ngOnInit() {
		if (this.isAuthenticated()) {
			this.userId = this.authService.getUserId();
			var checkUser = this.checkIfUserExists();
			var userStatus = this.userService.getUserStatus().subscribe(status => {
				if (status == 0) {
					this.authService.setAdminStatus(false);
				} else {
					this.authService.setAdminStatus(true);
				}
			});
			this.getSubjects();
		}
  	}
}
