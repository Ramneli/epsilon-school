import {HttpClient, json} from 'aurelia-fetch-client'

export class AddTask {
	userData = {};

	constructor() {
		this.myOptions = this.getAllSubjects();
		this.myOptionsId = [];
	}

	addTask() {
		let client = new HttpClient();
		let url = 'http://localhost:8080/task/add';

		console.log("Serverile saadetakse: " + JSON.stringify(this.userData));
	    client.fetch(url, {
	    	'method': "POST",
	    	'body': json(this.userData)
		})
			.then(response => {
				if (!response.ok) {
					alert("Palun kontrolli sisendit.");
				} else {
					alert("Ülesanne edukalt lisatud.");
				}
			})
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
					this.myOptionsId.push(data[i].id);
				}
	    });
		console.log("getSubjectDetails method executed!");
		return allSubjects;
	}
}