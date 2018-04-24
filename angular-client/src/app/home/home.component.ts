import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  test() {
    this.http.get<void>('http://localhost:8080/test', {observe: 'response'}).subscribe(response => {
      console.log(response);
    });
  }

}
