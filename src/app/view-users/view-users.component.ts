import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';



@Component({
  selector: 'app-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  selectedoption: string = 'id'
  ascordesc: string = 'asc'
  page: number = 1
  limit: number = 5
  usersorg: User[] = [];

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
    this.getheroes()
  }

  getusers(): void {
    this.heroService.getUsers(this.selectedoption, this.ascordesc, this.page, this.limit)
    .subscribe(users => this.users = users);}
    
    getheroes(): void {
      this.heroService.getHeroes()
      .subscribe(usersorg => this.usersorg = usersorg);
    
  }
  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.page = $event.pageIndex
    this.limit = $event.pageSize
    this.getusers();
  }
  
}

