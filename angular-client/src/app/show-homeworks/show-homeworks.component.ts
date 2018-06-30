import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { TaskService } from '../task-service/task.service';
import { AuthService } from '../auth-service/auth.service';
import { SubjectService } from '../subject-service/subject.service';

import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { EditHomeworkComponent } from '../edit-homework/edit-homework.component';
import { ReportHomeworkComponent } from '../report-homework/report-homework.component';
import { UserService } from '../user-service/user.service';


@Component({
  selector: 'app-show-homeworks',
  templateUrl: './show-homeworks.component.html',
  styleUrls: ['./show-homeworks.component.css']
})

export class ShowHomeworksComponent implements OnInit {

  subjectIDs = [];
  subjects = [];
  public currentSubjectId = -1;
  public tasks = [];
  subjectsLoaded: boolean;
  private userId: string;

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private subjectService: SubjectService,
              private router: Router,
              private dialog: MatDialog,
              private userService: UserService) {
    this.subjectsLoaded = false;
    this.userService.getBlockStatus().subscribe(res => {
      if (res === 1) {
        this.authService.logout().then(result => {
          alert('Your account has been disabled. For more info, please contact admin@epsilon.com');
        });
      }
    });
  }

  isAuthenticated() {
    return this.authService.getAuth();
  }

  getSubjects() {
    this.taskService.getSubjects(this.userId)
      .subscribe(subjects => {
        this.getHomeworkNamesAndIDs(subjects);
      });
  }

  getSubjectHomeworksDetails(subjectId) {
    this.deleteTable();
    this.currentSubjectId = subjectId;
    this.taskService.getTasksWithSubject(subjectId, this.userId)
      .subscribe(subjectWithTasks => {
        this.showHomeworks(subjectWithTasks);
      });
  }

  showHomeworks(subjectWithTasks) {
    const dataLength = Object.keys(subjectWithTasks.tasks[0]).length;
    if (dataLength !== 0) {
      this.tasks = subjectWithTasks.tasks[0];
      this.createTable(subjectWithTasks);
    } else {
      this.createTableWithNoHomeworks();
    }
  }

  getHomeworkNamesAndIDs(subjects) {
    for (let i = 0; i < subjects.length; i++) {
      this.subjects.push(subjects[i].name + ' \n\r(' + subjects[i].lecturer_name + ')');
      this.subjectIDs.push(subjects[i].id);
    }
    this.subjectsLoaded = true;
  }

  createTable(tableData) {
    this.populateTable(tableData);
  }

  makeNewTable(taskType) {
    const headers = ['Ülesanne', 'Tähtaeg', '', ''];
    const listWidth = ['taskColWidth', 'standardColWidth', 'editColWidth', 'editColWidth'];
    const table: HTMLTableElement = <HTMLTableElement> document.createElement('Table');
    table.setAttribute('id', taskType);
    const tableHeader = document.createElement('tr');

    for (let i = 0; i < headers.length; i++) {
      const cell = document.createElement('th');
      cell.setAttribute('id', listWidth[i]);
      cell.setAttribute('class', 'tasksTableHeader');
      cell.textContent = headers[i];
      tableHeader.appendChild(cell);
    }
    table.appendChild(tableHeader);
    return table;
  }

  populateTable(tableData) {
    const subjectLecturerHeader = document.createElement('h3');
    const subjectLecturerHeaderText = tableData.subject_name + ' - ' + tableData.lecturer_name;
    subjectLecturerHeader.setAttribute('id', 'subjectLecturerHeader');
    subjectLecturerHeader.appendChild(document.createTextNode(subjectLecturerHeaderText + '\n\r'));
    document.getElementById('tableDiv').appendChild(subjectLecturerHeader);
    let hasSubjects = false;
    if (Object.keys(tableData.tasks[0].Loeng).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].Loeng, 'Loeng', 'Loeng');
    }

    if (Object.keys(tableData.tasks[0].Harjutus).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].Harjutus, 'Harjutus', 'Harjutus');
    }

    if (Object.keys(tableData.tasks[0].Praktikum).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].Praktikum, 'Praktikum', 'Praktikum');
    }

    if (Object.keys(tableData.tasks[0].HarjutusPraktikum).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].HarjutusPraktikum, 'Harjutus + Praktikum',
        'HarjutusPraktikum');
    }

    if (Object.keys(tableData.tasks[0].LoengHarjutusPraktikum).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].LoengHarjutusPraktikum, 'Loeng + Harjutus + Praktikum',
        'Loeng + Harjutus + Praktikum');
    }

    if (Object.keys(tableData.tasks[0].LoengHarjutus).length > 0) {
      hasSubjects = true;
      this.populateTableWithTask(tableData, tableData.tasks[0].LoengHarjutus, 'Loeng + Harjutus',
        'LoengHarjutus');
    }
    if (!hasSubjects) {
      this.createTableWithNoHomeworks();
    }
  }

  populateTableWithTask(tableData, tasks, taskType, name) {
    const subjectTypeHeader = document.createElement('h4');
    subjectTypeHeader.setAttribute('id', 'subjectTypeHeader');
    const subjectTypeHeaderText = taskType;
    subjectTypeHeader.appendChild(document.createTextNode(subjectTypeHeaderText));
    document.getElementById('tableDiv').appendChild(subjectTypeHeader);

    let table: HTMLTableElement = <HTMLTableElement> document.getElementById(taskType + 'HomeworkTable');
    if (!table) {
      table = this.makeNewTable(taskType);
    }
    table.setAttribute('class', 'tasksTable');

    Object.keys(tasks).forEach(i => {
      const tr = table.insertRow();

      const header_task = tr.insertCell();
      const header_deadline = tr.insertCell();
      const header_edit = tr.insertCell();
      const header_report = tr.insertCell();
      const taskTypeNode = document.createElement('p');
      taskTypeNode.setAttribute('style', 'color: red; display: inline;');
      if (tasks[i].task_type === 'Kontrolltöö') {
        taskTypeNode.setAttribute('style', 'color: red; display: inline;');
        taskTypeNode.appendChild(document.createTextNode('Kontrolltöö: '));
      } else {
        taskTypeNode.setAttribute('style', 'color: black; display: inline;');
      }

      header_task.appendChild(taskTypeNode);
      header_task.appendChild(document.createTextNode(tasks[i].task_description));
      header_deadline.appendChild(document.createTextNode(tasks[i].task_deadline));

      if (this.userId === tasks[i].task_author) {
        const editButton = document.createElement('img');
        editButton.setAttribute('src', '../../assets/images/editbutton.png');
        editButton.setAttribute('width', '17');
        editButton.setAttribute('id', String(i));
        editButton.setAttribute('style', 'cursor: pointer;');
        editButton.addEventListener('click', e => {

          const editButtonId = editButton.getAttribute('id');
          const editCookieData: string = this.tasks[name][parseInt(editButtonId, 10)].task_description + ':' + tasks[i].task_id;
          localStorage.setItem('currentTask', editCookieData);
          this.editHomework();
        });
        header_edit.appendChild(editButton);
      }
      const reportButton = document.createElement('img');
      reportButton.setAttribute('src', '../../assets/images/reportbutton.png');
      reportButton.setAttribute('width', '17');
      reportButton.setAttribute('id', String(i));
      reportButton.setAttribute('style', 'cursor: pointer;');
      reportButton.addEventListener('click', e => {
        const reportCookieData: string = tasks[i].task_author + ':' + tasks[i].task_id;
        localStorage.setItem('currentReport', reportCookieData);
        this.reportHomework();
      });
      header_report.appendChild(reportButton);

    });
    table.setAttribute('cellpadding', '15');
    table.appendChild(document.createElement('br'));

    document.getElementById('tableDiv').appendChild(table);
  }

  reportHomework() {
    this.dialog.open(ReportHomeworkComponent, {
      width: '45%',
      height: '55%'
    });
  }

  editHomework() {
    this.dialog.open(EditHomeworkComponent, {
      width: '45%',
      height: '75%'
    });
  }

  createTableWithNoHomeworks() {
    let noHomeWorksMessage = document.getElementById('homeworkTable');

    if (!noHomeWorksMessage) {
      noHomeWorksMessage = document.createElement('h5');
      noHomeWorksMessage.setAttribute('id', 'homeworkTable');
      noHomeWorksMessage.appendChild(document.createTextNode('Ülesandeid ei ole.'));
      document.getElementById('tableDiv').appendChild(noHomeWorksMessage);
    }
  }

  deleteTable() {
    const parent = document.getElementById('tableDiv');

    if (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  openAddSubjectToTimetableDialog(): void {
    this.dialog.open(AddSubjectComponent, {
      width: '600px',
      height: '450px'
    });
  }

  isAdmin(): boolean {
    return this.authService.getAdminStatus();
  }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.userId = this.authService.getUserId();
      this.userService.getUserStatus().subscribe(status => {
        if (status === 0) {
          this.authService.setAdminStatus(false);
        } else {
          this.authService.setAdminStatus(true);
        }
      });
      this.getSubjects();
    }
  }
}
