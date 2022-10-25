import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddToTableService {

  private userSource = new BehaviorSubject('');
  currentSource = this.userSource.asObservable();
  constructor() { }


  addUserToTable(user:FormGroup){
    // this.userSource.next(user)
  }
}
