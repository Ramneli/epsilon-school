import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject-service/subject.service';
import { AuthService } from '../auth-service/auth.service';
import '../../../node_modules/rxjs/add/observable/of';
import '../../../node_modules/rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-eap-calculator',
  templateUrl: './eap-calculator.component.html',
  styleUrls: ['./eap-calculator.component.css']
})
export class EapCalculatorComponent implements OnInit {

  constructor(private subjectService: SubjectService,
              private authService: AuthService) {
  }

  addSubjectToEapTable(subjectName, grade, eapValue) {
    if (subjectName === '' || grade === '' || isNaN(parseInt(eapValue, 10))) {
      const objectsToValidate = document.getElementsByClassName('needs-validation');
      objectsToValidate[objectsToValidate.length - 1].className = 'was-validated';
    } else {
      const eapSubject = {
        'user_id': this.authService.getUserId(),
        'name': subjectName,
        'grade': grade,
        'eap': eapValue
      };
      this.subjectService.postEapSubject(eapSubject).subscribe(() => {
        this.updateTable();
      });
    }
  }

  updateTable() {
    let table: HTMLTableElement = <HTMLTableElement> document.getElementById('tasksTable');
    if (table) {
      table.parentNode.removeChild(table);
    }

    this.subjectService.getUserEapSubjects().subscribe(data => {
      const eapSubjectDiv = document.getElementById('eapSubjectsDiv');
      const headers = ['Aine', 'Hinne', 'EAP'];
      table = <HTMLTableElement> document.createElement('Table');
      table.classList.add('tasksTable');
      table.setAttribute('id', 'tasksTable');
      table.setAttribute('style', 'table-layout:fixed');

      const tr = table.insertRow();
      for (let i = 0; i < 3; i++) {
        const th = document.createElement('th');
        th.className = 'tasksTableHeader';
        th.appendChild(document.createTextNode(headers[i]));
        if (headers[i] !== 'Aine') {
          th.className += ' columnCenteredText';
          th.setAttribute('style', 'width:20%');
        } else {
          th.setAttribute('style', 'width:50%');
        }

        tr.appendChild(th);
      }
      const removeHeader = document.createElement('th');
      removeHeader.className = 'tasksTableHeader';
      removeHeader.appendChild(document.createTextNode(''));
      removeHeader.setAttribute('style', 'width: 5%');
      tr.appendChild(removeHeader);

      Object.keys(data).forEach(key => {
        const dataRow = table.insertRow();
        const eapValue = document.createElement('td');
        const grade = document.createElement('td');
        const remove = document.createElement('td');

        remove.className = 'columnCenteredText';
        eapValue.className = 'columnCenteredText';
        grade.className = 'columnCenteredText';
        eapValue.appendChild(document.createTextNode(data[key].eap));
        grade.appendChild(document.createTextNode(data[key].grade));

        const element = document.createElement('a');
        element.setAttribute('style', 'cursor:pointer; color: red');
        element.appendChild(document.createTextNode('x'));

        remove.appendChild(element);

        dataRow.insertCell().appendChild(document.createTextNode(data[key].name));
        dataRow.appendChild(grade);
        dataRow.appendChild(eapValue);
        dataRow.appendChild(remove);

        element.setAttribute('id', data[key].id);
        table.appendChild(dataRow);

        element.addEventListener('click', () => {
          console.log('ID: ' + element.id);
          this.subjectService.removeEapSubject(element.getAttribute('id')).subscribe(() => {
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
      const eapSubjectDiv = document.getElementById('eapSubjectsDiv');
      let gradeDiv = document.getElementById('gradeDiv');
      if (gradeDiv) {
        gradeDiv.parentNode.removeChild(gradeDiv);
      }
      gradeDiv = document.createElement('div');
      gradeDiv.setAttribute('id', 'gradeDiv');
      const gradeParagraph = document.createElement('p');

      gradeParagraph.setAttribute('style', 'display:inline; font-family: Helvetica');
      gradeDiv.setAttribute('style', 'text-align: right;');
      gradeParagraph.appendChild(document.createTextNode('Kaalutud keskmine hinne: ' + String(grade)));
      gradeDiv.appendChild(gradeParagraph);
      eapSubjectDiv.appendChild(gradeDiv);
    });
  }

  ngOnInit() {
    this.updateTable();
  }
}
