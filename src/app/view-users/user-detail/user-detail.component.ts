import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../core/models/user';
import { HeroService } from '../../shared/hero.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.user) {
      this.heroService.updateHero(this.user)
        .subscribe(() => this.goBack());
    }
  }

  delete(hero: User): void {
    this.heroService.deleteHero(hero.id).subscribe(() => this.goBack());
  } 
  
}

