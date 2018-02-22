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

	    client.fetch('http://localhost:9000/#/createnewsubject', {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
	        	console.log("Server saatis: "data.fullName);
	    });

			console.log("Method executed!")
	}
}