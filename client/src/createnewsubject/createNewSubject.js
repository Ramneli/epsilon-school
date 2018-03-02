import {HttpClient, json} from 'aurelia-fetch-client'

export class CreatNewSubject {

	getSubjectDetails() {
		let client = new HttpClient();
		let homeWorkTableData = new Object();

	    client.fetch('http://localhost:8080/subject/get/mata', {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				homeWorkTableData.aine = data[0].nimi;
				homeWorkTableData.opnimi = data[0].oppejoud;
				homeWorkTableData.ainekood = data[0].ainekood;
				this.getHomeworks("5", homeWorkTableData);
	        	console.log("Server saatis: " + JSON.stringify(data));
	    });
			console.log("getSubjectDetails method executed!");
	}

	getHomeworks(ID, tableData) {
		let client = new HttpClient();
		let parsedData = "";
	    client.fetch('http://localhost:8080/task/get/' + ID, {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
				console.log("Server saatis: " + JSON.stringify(data));
				let yl = [];
				for(var i = 0; i < data.length; i++) {
					yl.push(data[i].ylesanne_tekst);
				}
	        	tableData.yl = yl;
	        	console.log(tableData);
	    });
			console.log("getHomeworks method executed!");
	}
}
