import {HttpClient, json} from 'aurelia-fetch-client'

export class Homework {
	constructor() {
		this.mySubjects = this.getAllSubjects();
		this.mySubjectsId = [];
	}

	getSubjectDetails(subjectId) {
		for (var i = 1; i <= 1; i++) {
			let client = new HttpClient();
			let homeWorkTableData = new Object();
			let url = 'http://localhost:8080/subject/get/' + subjectId;

			client.fetch(url, {
				'method': "POST",
				'body': json(this.userData)
			})
				.then(response => response.json())
				.then(data => {
					homeWorkTableData.aine = data.name;
					homeWorkTableData.opnimi = data.lecturer_name;
					homeWorkTableData.ainekood = data.code;
					homeWorkTableData.aineID = data.id;
					this.getHomeworks(homeWorkTableData);
			});
		}
	}

	getHomeworks(tableData) {
		let client = new HttpClient();
		let parsedData = "";
	    client.fetch('http://localhost:8080/task/get/' + tableData.aineID, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				console.log("Server saatis kodutöö: " + JSON.stringify(data));
				if (data.length != 0) {
					this.deleteTable();
					for (var i = 0; i < data.length; i++) {
						console.log("aine " + tableData.aine);
						tableData.exercise = data[i].description;
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
			var headers = ["Aine", "Ülesanne", "Õppejõud", "Tähtaeg"];
			table = document.createElement("Table");
			table.setAttribute("id", "homeworkTable");
			var tableHeader = document.createElement("tr");
			for (var i = 0; i < 4; i++) {
				var cell = document.createElement("th");
				cell.textContent = headers[i];
				tableHeader.appendChild(cell);
			}
			table.appendChild(tableHeader);
		}

		var tr = table.insertRow();
		var td1 = tr.insertCell();
		var td2 = tr.insertCell();
		var td3 = tr.insertCell();
		var td4 = tr.insertCell();

		td1.appendChild(document.createTextNode(tableData.aine));
		td2.appendChild(document.createTextNode(tableData.exercise));
		td3.appendChild(document.createTextNode(tableData.opnimi));
		td4.appendChild(document.createTextNode(tableData.deadline));
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
				console.log("Server saatis: " + JSON.stringify(data));
				for (var i = 0; i < data.length; i++) {
					allSubjects.push(data[i].name);
					this.mySubjectsId.push(data[i].id);
				}
	    });
		console.log("getSubjectDetails method executed!");
		return allSubjects;
	}

	createTableWithNotification() {
		let table = document.getElementById("homeworkTable");
		if (!table) {
			var headers = ["Aine", "Ülesanne", "Õppejõud", "Tähtaeg"];
			table = document.createElement("Table");
			table.setAttribute("id", "homeworkTable");
			var tableHeader = document.createElement("tr");
				var cell = document.createElement("th");
				cell.textContent = "Teade";
				tableHeader.appendChild(cell);
			var tableRow = document.createElement("tr");
			var cell2 = document.createElement("th");
			cell2.textContent = "Ülesandeid ei ole.";
			tableRow.appendChild(cell2);
			table.appendChild(tableHeader);
			table.appendChild(tableRow);
			document.getElementById("tableDiv").appendChild(table);
		}
	}
}
