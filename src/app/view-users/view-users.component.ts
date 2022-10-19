import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { UserService } from '../shared/user.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  selectedoption: string = 'id'
  ascordesc: string = 'asc'
  page: number = 0
  limit: number = 5
  usersorg: User[] = [];
  col: string = "1"

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {

    this.getusers();
    this.getorgusers()
  }

  sortoption (event: Event) {
    
    this.selectedoption = (event.target as HTMLInputElement).value;
    this.getusers();
  }
  colnum (event: Event) {
    
    this.col = (event.target as HTMLInputElement).value;
  }
  sortdirection (event: Event) {
    this.ascordesc = (event.target as HTMLInputElement).value;
    this.getusers();
    
  }

  getusers(): void {
    this.userService.getUsers(this.selectedoption, this.ascordesc, this.page, this.limit)
    .subscribe(users => this.users = users);}
    
    getorgusers(): void {
      this.userService.getorgusers()
      .subscribe(usersorg => this.usersorg = usersorg);
    
  }
  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.page = $event.pageIndex + 1
    this.limit = $event.pageSize
    this.getusers();
    this.getorgusers();
    
  }
  
  delete(user: User): void {
    if(confirm("Are you sure you want to delete user: "+ user.firstName + " " + user.lastName + "? ")){
      this.userService.deleteUser(user.id).subscribe() ;
      this.getorgusers();
      if (!(user.id in this.usersorg)){
      this.users = this.users.filter(h => h !== user);
      }
    }

    
    
  } 

  goBack(): void {
    this.location.back();
  }
  
  
  goForward(): void {
    this.location.forward();
  }
}

