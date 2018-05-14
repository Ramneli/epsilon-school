import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';

@Component({
    selector: 'app-report-homework',
    templateUrl: './report-homework.component.html',
    styleUrls: ['./report-homework.component.css']
})
export class ReportHomeworkComponent implements OnInit {

    constructor(private taskService: TaskService,
                private authService: AuthService) { }

    reporter = "";

    reportHomework(userReport) {
        if (userReport.length == 0) {
            var objectsToValidate = document.getElementsByClassName("needs-validation");
            objectsToValidate[objectsToValidate.length - 1].className = "was-validated";
        } else {
            var cookieData = localStorage.getItem("currentReport");
            var parsedCookieData = cookieData.split(":");
            this.reporter = this.authService.getUserId();
            let reportData = {
                reportee: parsedCookieData[0],
                reporter: this.reporter,
                description: userReport,
                task_id: parsedCookieData[1]
            };
            console.log(reportData);
            this.taskService.reportHomework(reportData).subscribe();
        }
       
        
    }

    ngOnInit() {
    }

}
