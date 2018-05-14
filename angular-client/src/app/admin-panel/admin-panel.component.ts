import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification-service/notification.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private userService : UserService,
			private notificationService : NotificationService,
			private router : Router) {
	this.getReportedUsers();
  }


	getReportedUsers() {
		this.userService.getReportedUsers().subscribe(data => {
			var table : HTMLTableElement = <HTMLTableElement> document.getElementById("tasksTable");
			if (table) table.parentNode.removeChild(table);
			var eapSubjectDiv = document.getElementById("reports");
			var headers = ["Kasutaja id", "Raporteerimiste arv", "Raportid", "Blokeeri ligipääs", "Lahenda raport"];
			table = <HTMLTableElement> document.createElement("Table");
			table.classList.add("tasksTable");
			table.setAttribute("id", "tasksTable");

			var tr = table.insertRow();
			for (var i = 0; i < 5; i++) {
				let th = document.createElement("th");
				th.className = "tasksTableHeader";
				th.appendChild(document.createTextNode(headers[i]));
				if (headers[i] != "Kasutaja id") {
					th.className += " columnCenteredText";
				}
				tr.appendChild(th);
			}

			Object.keys(data).forEach(key => {
				var dataRow = table.insertRow();
				var uid = document.createElement("td");
				var reportsCount = document.createElement("td");
				var showReportDetails = document.createElement("td");
				var blockAccess = document.createElement("td");
				var resolveReport = document.createElement("td");

				reportsCount.className = "columnCenteredText"
				showReportDetails.className = "columnCenteredText";
				blockAccess.className = "columnCenteredText";
				resolveReport.className = "columnCenteredText";

				uid.appendChild(document.createTextNode(data[key].uid));
				reportsCount.appendChild(document.createTextNode(data[key].reportCount));

				var showReportDetailsBtn = document.createElement("button");
				showReportDetailsBtn.className = "btn btn-primary";
				showReportDetailsBtn.appendChild(document.createTextNode("Kuva raportid"));
				showReportDetailsBtn.setAttribute("style", "width:150px");
				
				var resolveReportBtn = document.createElement("button");
				resolveReportBtn.className = "btn btn-success";
				resolveReportBtn.appendChild(document.createTextNode("Lahenda"));
				resolveReportBtn.setAttribute("style", "width:150px");

				var blockAccessBtn = document.createElement("button");
				if (data[key].isBlocked == 1) {
					blockAccessBtn.className = "btn btn-success";
					blockAccessBtn.appendChild(document.createTextNode("Eemalda blokeering"));
				} else {
					blockAccessBtn.className = "btn btn-danger";
					blockAccessBtn.appendChild(document.createTextNode("Blokeeri"));
				}
				blockAccessBtn.setAttribute("style", "width:150px");
				
				

				showReportDetails.appendChild(showReportDetailsBtn);
				blockAccess.appendChild(blockAccessBtn);
				resolveReport.appendChild(resolveReportBtn);

				dataRow.appendChild(uid);
				dataRow.appendChild(reportsCount);
				dataRow.appendChild(showReportDetails);
				dataRow.appendChild(blockAccess);
				dataRow.appendChild(resolveReport);

				showReportDetailsBtn.setAttribute("id", data[key].uid);
				blockAccessBtn.setAttribute("id", data[key].uid);
				resolveReportBtn.setAttribute("id", data[key].uid);
				table.appendChild(dataRow);

				showReportDetailsBtn.addEventListener('click', e=> {
					this.userService.getReporteeInfo(String(showReportDetailsBtn.id)).subscribe(res => {
						if (Object.keys(res).length != 0) {
							this.userService.getReportedUserTasks(res[0].reportee).subscribe(details=> {
								this.createReportDetails(res, details);
							});
						} else {
							var detailsDiv = document.getElementById("reportDetailsData");
							var table : HTMLTableElement = <HTMLTableElement> document.getElementById("reportedTasksTable");
							var tableHead = document.getElementById("tableHead");
							if (detailsDiv) detailsDiv.parentNode.removeChild(detailsDiv);
							if (table) table.parentNode.removeChild(table);
							if (tableHead) tableHead.parentNode.removeChild(tableHead);
						}
					});
				});


				resolveReportBtn.addEventListener('click', e=> {
					this.userService.resolveReport(String(resolveReportBtn.id)).subscribe(res => {
						this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
							this.router.navigate(['/homeworks/admin']);
						});
					});
				});
				
				blockAccessBtn.addEventListener('click', e=> {
					this.userService.setBlockStatus(String(blockAccessBtn.id)).subscribe(res => {
						this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
							this.router.navigate(['/homeworks/admin']);
						});
					});
				});
				
			});
				eapSubjectDiv.appendChild(table);
		});
	}

	createReportDetails(reportData, tasks) {
		console.log(tasks);
		var parentDiv = document.getElementById("reportDetails");
		var detailsDiv = document.getElementById("reportDetailsData");
		var tableHead = document.getElementById("tableHead");
		var table : HTMLTableElement = <HTMLTableElement> document.getElementById("reportedTasksTable");

		if (detailsDiv) detailsDiv.parentNode.removeChild(detailsDiv);
		if (table) table.parentNode.removeChild(table);
		if (tableHead) tableHead.parentNode.removeChild(tableHead);

		tableHead = document.createElement("h4");
		tableHead.setAttribute("id", "tableHead");
		tableHead.appendChild(document.createTextNode("Raporteeritud ained"));
		parentDiv.appendChild(tableHead);

		


		var headers = ["Ülesande kirjeldus", "Tähtaeg"];
		table = <HTMLTableElement> document.createElement("Table");
		table.classList.add("reportedTasksTable");
		table.setAttribute("id", "reportedTasksTable");
		table.setAttribute("style", "table-layout:fixed; white-space: pre;");
		var tr = table.insertRow();
		for (var i = 0; i < 2; i++) {
			let th = document.createElement("th");
			th.className = "tasksTableHeader";
			th.appendChild(document.createTextNode(headers[i]));
			if (headers[i] == "Tähtaeg") {
				th.className += " columnCenteredText";
				th.setAttribute("style", "width:20%");
			} else {
				th.setAttribute("style", "width:80%");
			}

			tr.appendChild(th);
		}

		Object.keys(tasks).forEach(key => {
			var dataRow = table.insertRow();
			var taskDescription = document.createElement("td");
			var taskDeadline = document.createElement("td");

			taskDeadline.className = "columnCenteredText";
			taskDescription.appendChild(document.createTextNode(tasks[key].description));
			taskDeadline.appendChild(document.createTextNode(tasks[key].deadline));
			
			dataRow.appendChild(taskDescription);
			dataRow.appendChild(taskDeadline);
		});
		table.appendChild(document.createElement("br"));
		parentDiv.appendChild(table);
		if (Object.keys(reportData).length != 0) {
			detailsDiv = document.createElement("div");
			detailsDiv.id = "reportDetailsData";
			
			var header = document.createElement("h4");
			header.appendChild(document.createTextNode("Kasutajale " + reportData[0].reportee + " tehtud raporteerimiste põhjused."));

			detailsDiv.appendChild(header);
		
			var counter = 1;
			Object.keys(reportData).forEach(element => {
				var line = document.createElement("p");
				line.setAttribute("style", "font-family:Helvetica");
				line.appendChild(document.createTextNode(counter + ". " + reportData[element].description));
				var nextLine = document.createElement("br");
				line.appendChild(nextLine);
				detailsDiv.appendChild(line);
				counter++;
			});
			parentDiv.appendChild(detailsDiv);
	}
}


	sendNotification(notificationData) {
		var currentTime = (new Date).getTime() + 1000000000;
		let jsonData = {
			message: notificationData,
			deadline: currentTime
		};
		this.notificationService.saveNotification(jsonData).subscribe();
	}  


  ngOnInit() {

  }

}
