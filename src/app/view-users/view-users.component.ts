import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';
import {Pipe, PipeTransform} from '@angular/core';



@Component({
  selector: 'app-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  selectedoption: string = 'id'
  ascordesc: string = 'asc'
  currentusers: User[] = [];

  sortoption (event: any) {
    //update the ui
    this.selectedoption = event.target.value;
    this.getusers();
  }

  sortdirection (event: any) {
    this.ascordesc = event.target.value;
    this.getusers();
    
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getusers();
    this.currentusers=this.users;
  }

  getusers(): void {
    this.heroService.getUsers(this.selectedoption, this.ascordesc)
    .subscribe(users => this.users = users);
    
  }
  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.currentusers =  this.users.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }
  
}

