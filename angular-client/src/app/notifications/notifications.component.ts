import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../notification-service/notification.service';
import { AuthService } from '../auth-service/auth.service';

@Component({
selector: 'app-notifications',
templateUrl: './notifications.component.html',
styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

	constructor(private notificationService: NotificationService, private authService : AuthService) { }

	createNotificationsTable(notifications) {
		this.deleteTable();
		var table = document.createElement("table");
		table.setAttribute("class", "tasksTable");
		table.setAttribute("cellpadding", "15");

		var header_message = document.createElement("th");
		var header_deadline = document.createElement("th");
		header_message.appendChild(document.createTextNode("Teavitus"));
		header_deadline.appendChild(document.createTextNode("Saadetud"));

		header_message.setAttribute("class", "tasksTableHeader");
		header_deadline.setAttribute("class", "tasksTableHeader");
		header_deadline.className += " columnCenteredText";

		header_message.setAttribute("id", "messageColWidth");
		header_deadline.setAttribute("id", "deadlineColWidth");

		var header_Row = document.createElement("tr");

		header_Row.appendChild(header_message);
		header_Row.appendChild(header_deadline);

		table.appendChild(header_Row);

		for (var i = 0; i < notifications.length; i++) {
			var tr = table.insertRow();

			var message = tr.insertCell();
			var deadline = tr.insertCell();

			message.appendChild(document.createTextNode(notifications[i].message));
			deadline.appendChild(document.createTextNode(notifications[i].deadline));
		}
	    document.getElementById("tableDiv").appendChild(table);
	}

	displayNoContent() {
		this.deleteTable();

		var noNotificationsMessage = document.createElement("p").appendChild(
			document.createTextNode("Teil ei ole ühtegi teavitust."));
		document.getElementById("tableDiv").appendChild(noNotificationsMessage);
	}
	
	getNotifications() {
		this.notificationService.loadNotifications().subscribe(notifications => {
			if (Object.keys(notifications).length == 0) {
				this.displayNoContent();
			} else {
				this.createNotificationsTable(notifications);
			}
		});
	}

	deleteTable() {
		var currentTable = document.getElementById("table");
		if (currentTable) {
			currentTable.parentNode.removeChild(currentTable);
		}
	}

	ngOnInit() {
		this.getNotifications();
	}

}
