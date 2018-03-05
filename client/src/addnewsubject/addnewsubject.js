import {HttpClient, json} from 'aurelia-fetch-client'

export class AddSubject {

	userData = {};

	addSubject() {
		let client = new HttpClient();
		let url = 'http://localhost:8080/subject/add';

		console.log("Serverile saadetakse: " + JSON.stringify(this.userData));
	    client.fetch(url, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => {
				if (!response.ok) {
					alert("Palun kontrolli sisendit.");
				} else {
					alert("Aine edukalt lisatud.");
				}
				response.json()
			});
	}
}