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

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router) {
    this.getReportedUsers();
  }


  getReportedUsers() {
    this.userService.getReportedUsers().subscribe(data => {
      if (Object.keys(data).length !== 0) {
        let table: HTMLTableElement = <HTMLTableElement> document.getElementById('tasksTable');
        if (table) {
          table.parentNode.removeChild(table);
        }
        const eapSubjectDiv = document.getElementById('reports');
        const headers = ['Kasutaja id', 'Raporteerimiste arv', 'Raportid', 'Blokeeri ligipääs', 'Lahenda raport'];
        table = <HTMLTableElement> document.createElement('Table');
        table.classList.add('tasksTable');
        table.setAttribute('id', 'tasksTable');

        const tr = table.insertRow();
        for (let i = 0; i < 5; i++) {
          const th = document.createElement('th');
          th.className = 'tasksTableHeader';
          th.appendChild(document.createTextNode(headers[i]));
          if (headers[i] !== 'Kasutaja id') {
            th.className += ' columnCenteredText';
          }
          tr.appendChild(th);
        }

        Object.keys(data).forEach(key => {
          const dataRow = table.insertRow();
          const uid = document.createElement('td');
          const reportsCount = document.createElement('td');
          const showReportDetails = document.createElement('td');
          const blockAccess = document.createElement('td');
          const resolveReport = document.createElement('td');

          reportsCount.className = 'columnCenteredText';
          showReportDetails.className = 'columnCenteredText';
          blockAccess.className = 'columnCenteredText';
          resolveReport.className = 'columnCenteredText';

          uid.appendChild(document.createTextNode(data[key].uid));
          reportsCount.appendChild(document.createTextNode(data[key].reportCount));

          const showReportDetailsBtn = document.createElement('button');
          showReportDetailsBtn.className = 'btn btn-primary';
          showReportDetailsBtn.appendChild(document.createTextNode('Kuva raportid'));
          showReportDetailsBtn.setAttribute('style', 'width:150px');

          const resolveReportBtn = document.createElement('button');
          resolveReportBtn.className = 'btn btn-success';
          resolveReportBtn.appendChild(document.createTextNode('Lahenda'));
          resolveReportBtn.setAttribute('style', 'width:150px');

          const blockAccessBtn = document.createElement('button');
          if (data[key].isBlocked === 1) {
            blockAccessBtn.className = 'btn btn-success';
            blockAccessBtn.appendChild(document.createTextNode('Eemalda blokeering'));
          } else {
            blockAccessBtn.className = 'btn btn-danger';
            blockAccessBtn.appendChild(document.createTextNode('Blokeeri'));
          }
          blockAccessBtn.setAttribute('style', 'width:150px');


          showReportDetails.appendChild(showReportDetailsBtn);
          blockAccess.appendChild(blockAccessBtn);
          resolveReport.appendChild(resolveReportBtn);

          dataRow.appendChild(uid);
          dataRow.appendChild(reportsCount);
          dataRow.appendChild(showReportDetails);
          dataRow.appendChild(blockAccess);
          dataRow.appendChild(resolveReport);

          showReportDetailsBtn.setAttribute('id', data[key].uid);
          blockAccessBtn.setAttribute('id', data[key].uid);
          resolveReportBtn.setAttribute('id', data[key].uid);
          table.appendChild(dataRow);

          showReportDetailsBtn.addEventListener('click', () => {
            this.userService.getReporteeInfo(String(showReportDetailsBtn.id)).subscribe(res => {
              if (Object.keys(res).length !== 0) {
                this.userService.getReportedUserTasks(res[0].reportee).subscribe(details => {
                  this.createReportDetails(res, details);
                });
              } else {
                const detailsDiv = document.getElementById('reportDetailsData');
                const tasksTable: HTMLTableElement = <HTMLTableElement> document.getElementById('reportedTasksTable');
                const tableHead = document.getElementById('tableHead');
                if (detailsDiv) {
                  detailsDiv.parentNode.removeChild(detailsDiv);
                }
                if (tasksTable) {
                  tasksTable.parentNode.removeChild(tasksTable);
                }
                if (tableHead) {
                  tableHead.parentNode.removeChild(tableHead);
                }
              }
            });
          });


          resolveReportBtn.addEventListener('click', () => {
            this.userService.resolveReport(String(resolveReportBtn.id)).subscribe(() => {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/homeworks/admin']);
              });
            });
          });

          blockAccessBtn.addEventListener('click', () => {
            this.userService.setBlockStatus(String(blockAccessBtn.id)).subscribe(() => {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/homeworks/admin']);
              });
            });
          });

        });
        eapSubjectDiv.appendChild(table);
      } else {
        const eapSubjectDiv = document.getElementById('reports');
        const noReportsMessage = document.createElement('p');
        noReportsMessage.appendChild(document.createTextNode('Raporteid ei ole.'));
        eapSubjectDiv.appendChild(noReportsMessage);
      }
    });

  }

  createReportDetails(reportData, tasks) {
    console.log(tasks);
    const parentDiv = document.getElementById('reportDetails');
    let detailsDiv = document.getElementById('reportDetailsData');
    let tableHead = document.getElementById('tableHead');
    let table: HTMLTableElement = <HTMLTableElement> document.getElementById('reportedTasksTable');

    if (detailsDiv) {
      detailsDiv.parentNode.removeChild(detailsDiv);
    }
    if (table) {
      table.parentNode.removeChild(table);
    }
    if (tableHead) {
      tableHead.parentNode.removeChild(tableHead);
    }

    tableHead = document.createElement('h4');
    tableHead.setAttribute('id', 'tableHead');
    tableHead.appendChild(document.createTextNode('Raporteeritud ülesanded'));
    parentDiv.appendChild(tableHead);


    const headers = ['Ülesande kirjeldus', 'Tähtaeg'];
    table = <HTMLTableElement> document.createElement('Table');
    table.classList.add('reportedTasksTable');
    table.setAttribute('id', 'reportedTasksTable');
    table.setAttribute('style', 'table-layout:fixed; white-space: pre;');
    const tr = table.insertRow();
    for (let i = 0; i < 2; i++) {
      const th = document.createElement('th');
      th.className = 'tasksTableHeader';
      th.appendChild(document.createTextNode(headers[i]));
      if (headers[i] === 'Tähtaeg') {
        th.className += ' columnCenteredText';
        th.setAttribute('style', 'width:20%');
      } else {
        th.setAttribute('style', 'width:80%');
      }

      tr.appendChild(th);
    }

    Object.keys(tasks).forEach(key => {
      const dataRow = table.insertRow();
      const taskDescription = document.createElement('td');
      const taskDeadline = document.createElement('td');

      taskDeadline.className = 'columnCenteredText';
      taskDescription.appendChild(document.createTextNode(tasks[key].description));
      taskDeadline.appendChild(document.createTextNode(tasks[key].deadline));

      dataRow.appendChild(taskDescription);
      dataRow.appendChild(taskDeadline);
    });
    table.appendChild(document.createElement('br'));
    parentDiv.appendChild(table);
    if (Object.keys(reportData).length !== 0) {
      detailsDiv = document.createElement('div');
      detailsDiv.id = 'reportDetailsData';

      const header = document.createElement('h4');
      header.appendChild(document.createTextNode('Kasutajale ' + reportData[0].reportee + ' tehtud raporteerimiste põhjused.'));

      detailsDiv.appendChild(header);

      let counter = 1;
      Object.keys(reportData).forEach(element => {
        const line = document.createElement('p');
        line.setAttribute('style', 'font-family:Helvetica');
        line.appendChild(document.createTextNode(counter + '. ' + reportData[element].description));
        const nextLine = document.createElement('br');
        line.appendChild(nextLine);
        detailsDiv.appendChild(line);
        counter++;
      });
      parentDiv.appendChild(detailsDiv);
    }
  }


  sendNotification(notificationData) {
    const currentTime = (new Date).getTime();
    const jsonData = {
      message: notificationData,
      deadline: currentTime
    };
    this.notificationService.saveNotification(jsonData).subscribe(() => {
      const notificationBox: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById('notificationTextArea');
      notificationBox.value = '';
    });
  }

  ngOnInit() {
  }
}
