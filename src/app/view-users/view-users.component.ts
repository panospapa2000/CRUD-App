import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  heroes: Hero[] = [];
  
  
constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }
  add(firstName: string,lastName: string,email: string,phone: string, image: string): void {
    firstName = firstName.trim();
    if (!firstName) { return; }
    this.heroService.addHero({ firstName,lastName,email,phone,image } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }




}

