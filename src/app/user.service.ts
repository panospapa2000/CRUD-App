import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
//import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  url='http://onelity.azurewebsites.net/users';


  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

}
