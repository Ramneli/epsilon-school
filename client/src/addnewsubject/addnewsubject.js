import {HttpClient, json} from 'aurelia-fetch-client'

export class AddSubject {

	userData = {};

	constructor() {
		this.myOptions = this.getAllSubjects();
		this.myOptionsId = [];
	}

	addSubjectToTimetable() {
		let client = new HttpClient();
		let url = 'http://localhost:8080/timetable/addTo';
		this.userData.username = "root";

		console.log("Serverile saadetakse: " + JSON.stringify(this.userData));
	    client.fetch(url, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => {
				if (!response.ok) {
					alert("Selline aine on juba tunniplaanis.");
				} else {
					alert("Aine edukalt lisatud.");
				}
			});
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
					var subjectDetails = data[i].name + " [" + data[i].code + "] " + " (" + data[i].lecturer_name + ")";
					allSubjects.push(subjectDetails);
					this.myOptionsId.push(data[i].id);
				}
	    });
		console.log("getSubjectDetails method executed!");
		return allSubjects;
	}
}