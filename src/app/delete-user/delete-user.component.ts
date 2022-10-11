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

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(users => this.users = users);
  }


  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.heroService.deleteHero(user.id).subscribe();
  } 

}
