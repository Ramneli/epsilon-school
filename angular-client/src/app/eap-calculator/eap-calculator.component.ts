import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eap-calculator',
  templateUrl: './eap-calculator.component.html',
  styleUrls: ['./eap-calculator.component.css']
})
export class EapCalculatorComponent implements OnInit {

  constructor() { }

  addSubjectToEapTable(subjectName, subjectMark, eapValue) {
    if (subjectName == "" || subjectMark == "" || isNaN(parseInt(eapValue))) {
      alert("Viga lähteandmetes.");
    } else {
    alert("TODO (send to server): " + subjectName + " " + subjectMark + " " + eapValue);
    }
  }

  ngOnInit() {
  }

}
