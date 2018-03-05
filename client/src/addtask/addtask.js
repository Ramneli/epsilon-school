import {HttpClient, json} from 'aurelia-fetch-client'

export class AddTask {
	userData = {};

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
				response.json();
			})
	}
}