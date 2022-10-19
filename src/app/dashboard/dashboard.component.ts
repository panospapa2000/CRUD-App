import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  
  users: User[] = [];
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
  
  
  goForward(): void {
    this.location.forward();
  }

}