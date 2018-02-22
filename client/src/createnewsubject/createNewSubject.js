import {HttpClient, json} from 'aurelia-fetch-client'

export class CreatNewSubject {

	userData = {};

	creatSubject() {
		let client = new HttpClient();

		/*let userData = {
			"fullName": "MyName",
			"subjectCode": "hehe",
			"subjectName": "YEXD"
		}*/

	    client.fetch('http://localhost:8080/subject/get/mata', {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
			
	        	console.log("Server saatis: " + JSON.stringify(data));
	    });

			console.log("Method executed!")
	}
}