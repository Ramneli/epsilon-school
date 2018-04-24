import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }


  displaySuccessAlert() {
    var successAlert = document.createElement("div");
		successAlert.setAttribute('id', "successAlert");
		successAlert.setAttribute("class", "alert alert-success");
		successAlert.appendChild(document.createTextNode('Seaded on salvestatud!'));

		var alertDiv = document.getElementById('alert');
		alertDiv.appendChild(successAlert);
		this.startAlertTimeout();
	}

	startAlertTimeout() {
	    setTimeout(function () {
	    	var successAlert = document.getElementById('successAlert');
	    	successAlert.parentNode.removeChild(successAlert);
	    }, 3000);
	}

  ngOnInit() {
  }

}
