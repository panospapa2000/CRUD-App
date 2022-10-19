import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService, private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
  
  
  goForward(): void {
    this.location.forward();
  }

}
