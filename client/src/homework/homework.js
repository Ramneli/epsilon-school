import {HttpClient, json} from 'aurelia-fetch-client'

export class Homework {
	constructor() {
		this.mySubjects = ["Matemaatiline analüüs"];
	}
	getSubjectDetails() {
		let client = new HttpClient();
		let homeWorkTableData = new Object();
		let url = 'http://localhost:8080/subject/get/1';

	    client.fetch(url, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				console.log("Server saatis: " + JSON.stringify(data));
				homeWorkTableData.aine = data.name;
				homeWorkTableData.opnimi = data.lecturer_name;
				homeWorkTableData.ainekood = data.code;
				homeWorkTableData.aineID = data.id;
				this.getHomeworks(homeWorkTableData);
	    });
			console.log("getSubjectDetails method executed!");
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
				/*let exercise = [];
				let deadline = [];
				for(var i = 0; i < data.length; i++) {
					exercise.push(data[i].description);
					deadline.push(data[i].deadline);
				}*/
	        	tableData.exercise = data.description;
	        	tableData.deadline = data.deadline;
	        	console.log(tableData);
	        	this.createTable(tableData);
	    });
			console.log("getHomeworks method executed!");
	}

	createTable(tableData) {
	    let table  = document.getElementById("homeworkTable");
	    //console.log(tableData);

	    for(var i = 0; i < 1; i++){
	        var tr = table.insertRow();
            var td1 = tr.insertCell();
            var td2 = tr.insertCell();
            var td3 = tr.insertCell();
            var td4 = tr.insertCell();

            td1.appendChild(document.createTextNode(tableData.aine));
            td2.appendChild(document.createTextNode(tableData.exercise));
            td3.appendChild(document.createTextNode(tableData.opnimi));
            td4.appendChild(document.createTextNode(tableData.deadline));

	    }
	    document.getElementById("tableDiv").appendChild(table);
	    console.log("Table created.")
	}
}
