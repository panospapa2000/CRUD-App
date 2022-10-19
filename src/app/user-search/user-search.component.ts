import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { User } from '../core/models/user';
import { UserService } from '../shared/user.service';
 
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: [ './user-search.component.css' ]
})
export class UserSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();
  searchtype: string ='id'


  constructor(private userService: UserService,   private location: Location) {}

  ngOnInit(): void { 
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term, this.searchtype)),
    );
  }

  searchoption (event: Event) {
    this.searchtype = (event.target as HTMLInputElement).value;
  }


  search(term: string): void {
    this.searchTerms.next(term);
   
  }

  

  goBack(): void {
    this.location.back();
  }
  
  
  goForward(): void {
    this.location.forward();
  }
}