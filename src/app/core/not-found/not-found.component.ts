import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private location: Location) {}

  ngOnInit(): void {
    
  }
  goBack(): void {
    this.location.back();
  }
  goForward(): void {
    this.location.forward();
  }
}
