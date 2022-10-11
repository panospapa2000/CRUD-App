import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  users: User[] = [];
  
  
constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }
  add(firstName: string,lastName: string,email: string,phone: string, image: string): void {
    firstName = firstName.trim();
    if (!firstName) { return; }
    this.heroService.addHero({ firstName,lastName,email,phone,image } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }




}

