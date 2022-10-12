import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
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

  getheroes(): void {
    this.heroService.getHeroes()
    .subscribe(usersorg => this.usersorg = usersorg);
  
}


  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getusers();
    this.getheroes();
  }

  getusers(): void {
    this.heroService.getUsers(this.selectedoption, this.ascordesc, this.page, this.limit)
    .subscribe(users => this.users = users);
    
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.heroService.deleteHero(user.id).subscribe();
  } 

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.page = $event.pageIndex
    this.limit = $event.pageSize
    this.getusers()
  }
}
