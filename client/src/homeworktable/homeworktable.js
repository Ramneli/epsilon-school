export class Table {
	constructor() {
		this.message = "hello!";
		this.allSubjects = [];
		this.mySubjects = ["IDK0050", "IDK1230", "YMR0020", "IDU0150"];
	}
	
	/*getTableData() {
		let client = new HttpClient();

	    client.fetch('http://localhost:8080/subject/get/mari', {
	    	'method': "POST",
	    	'body': json(this.userData)
	    })
	        .then(response => response.json())
	        .then(data => {
			
	        	console.log("Server saatis: " + JSON.stringify(data));
	    });

			console.log("Method executed!")
			return JSON.stringify(data);
	}

	drawTable() {

		var tableData = getTableData();

		var table = document.createElement("table");
		var row = document.createElement("tr");

		for (var i = 0; i < squareNumber; i++) {
			for(var j = 0; j < squareNumber; j++) {
				var cell = document.createElement("td");
				var cellId = j + "," + i;
				cell.setAttribute("id", cellId);
				cellList.push(cell);
				cell.onclick = function() {clickOnCell(this, bombs);};
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		table.appendChild(table);
	}*/
}