import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings-service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	settingsLoaded : boolean = false;

  constructor(private settingsService : SettingsService) {
	 }


	saveSettings(deadline) {
		var showOldTasks = 0;
		if (deadline.checked) showOldTasks = 1;
		this.settingsService.saveSettings(String(showOldTasks)).subscribe(res => {
			this.displaySuccessAlert();
		});
	}

	loadSettings() {
		
	}

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
			this.settingsService.loadSettings().subscribe(data => {
				var showOldTasks : boolean = false;
				var settings = JSON.parse(JSON.stringify(data));
				if(settings.oldTasks == 1) showOldTasks = true;
				var oldTasksSetting : HTMLInputElement;
					console.log("hi!");
					oldTasksSetting = <HTMLInputElement> document.getElementById("oldTasks");
					oldTasksSetting.checked = showOldTasks;
					this.settingsLoaded = true;				
			});
  }

}
