import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';
 
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: [ './user-search.component.css' ]
})
export class UserSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();
  searchtype: any ='id'

  searchoption (event: any) {
    //update the ui
    this.searchtype = event.target.value;
  }

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
   
  }

  ngOnInit(): void { 
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchUsers(term, this.searchtype)),
    );
  }
}