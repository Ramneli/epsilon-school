import {HttpClient, json} from 'aurelia-fetch-client'

export class Homework {
	constructor() {
		this.mySubjects = ["mari", "mata"];
	}
	getSubjectDetails() {
		let client = new HttpClient();
		let homeWorkTableData = new Object();
		let url = 'http://localhost:8080/subject/get/mata';

	    client.fetch(url, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				homeWorkTableData.aine = data[0].nimi;
				homeWorkTableData.opnimi = data[0].oppejoud;
				homeWorkTableData.ainekood = data[0].ainekood;
				homeWorkTableData.aineID = data[0].id;
				this.getHomeworks(homeWorkTableData);
	        	console.log("Server saatis: " + JSON.stringify(data));
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
				console.log("Server saatis: " + JSON.stringify(data));
				let exercise = [];
				let deadline = [];
				for(var i = 0; i < data.length; i++) {
					exercise.push(data[i].ylesanne_tekst);
					deadline.push(data[i].tahtaeg);
				}
	        	tableData.exercise = exercise;
	        	tableData.deadline = deadline;
	        	console.log(tableData);
	        	this.createTable(tableData);
	    });
			console.log("getHomeworks method executed!");
	}

	createTable(tableData) {
	    let table  = document.getElementById("homeworkTable");
	    //console.log(tableData);

	    for(var i = 0; i < tableData.exercise.length; i++){
	        var tr = table.insertRow();
            var td1 = tr.insertCell();
            var td2 = tr.insertCell();
            var td3 = tr.insertCell();
            var td4 = tr.insertCell();

            td1.appendChild(document.createTextNode(tableData.aine));
            td2.appendChild(document.createTextNode(tableData.exercise[i]));
            td3.appendChild(document.createTextNode(tableData.opnimi));
            td4.appendChild(document.createTextNode(tableData.deadline[i]));

	    }
	    document.getElementById("tableDiv").appendChild(table);
	}
}
