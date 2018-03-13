import {HttpClient, json} from 'aurelia-fetch-client'

export class Homework {
	constructor() {
		this.mySubjects = this.getAllSubjects();
		this.mySubjectsId = [];
	}

	getSubjectDetails(subjectId) {
		for (var i = 1; i <= 1; i++) {
			let client = new HttpClient();
			let tableData = new Object();
			let url = 'http://localhost:8080/subject/get/' + subjectId;

			client.fetch(url, {
				'method': "POST",
				'body': json(this.userData)
			})
				.then(response => response.json())
				.then(data => {
					tableData.name = data.name;
					tableData.lecturer_name = data.lecturer_name;
					tableData.subject_code = data.code;
					tableData.subject_id = data.id;
					tableData.type = data.type;
					this.getHomeworks(tableData);
			});
		}
	}

	getHomeworks(tableData) {
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
					this.createTableWithNotification();
				}
	    });
	}

	createTable(tableData) {
		let table = document.getElementById("homeworkTable");
		if (!table) {
			var headers = ["Aine", "Aine tüüp", "Ülesanne", "Õppejõud", "Tähtaeg"];
			var listWidth = ["standardColWidth", "standardColWidth", "taskColWidth", "standardColWidth", "standardColWidth"];
			table = document.createElement("Table");
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

	getAllSubjects() {
		var allSubjects = [];
		let client = new HttpClient();
		let url = 'http://localhost:8080/timetable/get/root';

	    client.fetch(url, {
	    	'method': "POST"
	    })
	        .then(response => response.json())
	        .then(data => {
				for (var i = 0; i < data.length; i++) {
					allSubjects.push(data[i].name);
					this.mySubjectsId.push(data[i].id);
				}
	    });
		return allSubjects;
	}

	createTableWithNotification() {
		let table = document.getElementById("homeworkTable");
		if (!table) {
			table = document.createElement("Table");
			table.setAttribute("id", "homeworkTable");

			var tableHeader = document.createElement("tr");
			var cell_message = document.createElement("th");
			var tableRow = document.createElement("tr");
			var cell_message_content = document.createElement("th");

			cell_message.textContent = "Teade";
			cell_message_content.textContent = "Ülesandeid ei ole.";
			
			tableHeader.appendChild(cell_message);
			tableRow.appendChild(cell_message_content);
			table.appendChild(tableHeader);
			table.appendChild(tableRow);
			document.getElementById("tableDiv").appendChild(table);
		}
	}
}
