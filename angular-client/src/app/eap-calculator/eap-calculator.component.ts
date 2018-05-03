import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject-service/subject.service';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import '../../../node_modules/rxjs/add/observable/of';
import '../../../node_modules/rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-eap-calculator',
  templateUrl: './eap-calculator.component.html',
  styleUrls: ['./eap-calculator.component.css']
})
export class EapCalculatorComponent implements OnInit {

  constructor(private subjectService : SubjectService,
              private authService : AuthService) { }

  addSubjectToEapTable(subjectName, grade, eapValue) {
    if (subjectName == "" || grade == "" || isNaN(parseInt(eapValue))) {
      	var objectsToValidate = document.getElementsByClassName("needs-validation");
		objectsToValidate[objectsToValidate.length - 1].className = "was-validated";
    } else {
      let eapSubject = {
        "user_id": this.authService.getUserId(),
        "name"   : subjectName,
        "grade"  : grade,
        "eap"    : eapValue
      }
      this.subjectService.postEapSubject(eapSubject).subscribe(result => {
				this.updateTable();
      });
    }
  }

  updateTable() {
	var table : HTMLTableElement = <HTMLTableElement> document.getElementById("tasksTable");
	if (table) table.parentNode.removeChild(table);

	const combined = Observable.forkJoin(
		this.subjectService.getUserEapSubjects(),
		this.subjectService.getAverageGrade()
	);
	
	combined.subscribe(data => {
		console.log(data);
	});

	var eapSubjects = this.subjectService.getUserEapSubjects().subscribe(data => {
		var eapSubjectDiv = document.getElementById("eapSubjectsDiv");
		var headers = ["Aine", "Hinne", "EAP"];
		table = <HTMLTableElement> document.createElement("Table");
		table.classList.add("tasksTable");
		table.setAttribute("id", "tasksTable");

		var tr = table.insertRow();
		for (var i = 0; i < 3; i++) {
			let th = document.createElement("th");
			th.className = "tasksTableHeader";
			th.appendChild(document.createTextNode(headers[i]));
			if (headers[i] != "Aine") {
				th.className += " columnCenteredText";
			}

			tr.appendChild(th);
		}
		let removeHeader = document.createElement("th");
		removeHeader.className = "tasksTableHeader";
		removeHeader.appendChild(document.createTextNode(""));
		tr.appendChild(removeHeader);

		Object.keys(data).forEach(key => {
			var dataRow = table.insertRow();
			var eapValue = document.createElement("td");
			var grade = document.createElement("td");
			var remove = document.createElement("td");

			remove.className = "columnCenteredText"
			eapValue.className = "columnCenteredText";
			grade.className = "columnCenteredText";
			eapValue.appendChild(document.createTextNode(data[key].eap));
			grade.appendChild(document.createTextNode(data[key].grade));

			var element = document.createElement("a");
			element.setAttribute("style", "cursor:pointer; color: red");
			element.appendChild(document.createTextNode("x"));
			
			remove.appendChild(element);

			dataRow.insertCell().appendChild(document.createTextNode(data[key].name));
			dataRow.appendChild(grade);
			dataRow.appendChild(eapValue);
			dataRow.appendChild(remove);

			element.setAttribute("id", data[key].id);
			table.appendChild(dataRow);

			element.addEventListener('click', e=> {
				console.log("ID: " + element.id);
				this.subjectService.removeEapSubject(element.getAttribute("id")).subscribe(res => {
					this.updateTable();
				});
				
			});
			
		});
			eapSubjectDiv.appendChild(table);
			this.loadAverageGrade();
	});
  }

  loadAverageGrade() {
	  this.subjectService.getAverageGrade().subscribe(grade => {
		var eapSubjectDiv = document.getElementById("eapSubjectsDiv");
		var gradeDiv = document.getElementById("gradeDiv");
		if (gradeDiv) gradeDiv.parentNode.removeChild(gradeDiv);
		gradeDiv = document.createElement("div");
		gradeDiv.setAttribute("id", "gradeDiv");
		var gradeParagraph = document.createElement("p");
			
		gradeParagraph.setAttribute("style", "display:inline; font-family: Helvetica");
		gradeDiv.setAttribute("style", "text-align: right;");
		gradeParagraph.appendChild(document.createTextNode("Kaalutud keskmine hinne: " + String(grade)));
		gradeDiv.appendChild(gradeParagraph);
		eapSubjectDiv.appendChild(gradeDiv);
		}); 
	}
	
  ngOnInit() {
    this.updateTable();
  }
}
