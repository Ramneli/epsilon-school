import {HttpClient, json} from 'aurelia-fetch-client'

export class Homework {
	constructor() {
		this.mySubjects = this.getAllSubjects();
		this.mySubjectsId = [];
	}

	getSubjectDetails() {
		this.deleteTable();
		for (var i = 1; i <= this.mySubjectsId.length; i++) {
			let client = new HttpClient();
			let homeWorkTableData = new Object();
			let url = 'http://localhost:8080/subject/get/' + this.mySubjectsId[i - 1];

			client.fetch(url, {
				'method': "POST",
				'body': json(this.userData)
			})
				.then(response => response.json())
				.then(data => {
					console.log("HUVITAV saatis: " + JSON.stringify(data));
					homeWorkTableData.aine = data.name;
					homeWorkTableData.opnimi = data.lecturer_name;
					homeWorkTableData.ainekood = data.code;
					homeWorkTableData.aineID = data.id;
					this.getHomeworks(homeWorkTableData);
			});
			console.log("getSubjectDetails method executed!");
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
					for (var i = 0; i < data.length; i++) {
						console.log("aine " + tableData.aine);
						tableData.exercise = data[i].description;
						tableData.deadline = data[i].deadline;
						this.createTable(tableData);
					}
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
		table.parentNode.removeChild(table);
	}

	getAllSubjects() {
		var allSubjects = [];
		let client = new HttpClient();
		let url = 'http://localhost:8080/subjects';

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
}
