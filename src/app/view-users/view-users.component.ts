import { Component, OnInit } from '@angular/core';

import { User } from '../shared/user';
import { HeroService } from '../shared/hero.service';
import {Pipe, PipeTransform} from '@angular/core';



@Component({
  selector: 'app-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(users => this.users = users);
  }
}