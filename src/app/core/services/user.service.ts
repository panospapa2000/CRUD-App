import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
//import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { userFormGroup } from '../model/userFormGroup';
import { userFormValues } from '../model/userFormValues';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  url='http://onelity.azurewebsites.net/users/';


  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  createUser(user:Partial<userFormValues>){
    return this.http.post<User>(this.url,user,this.httpOptions);
  }

  updateUser(user:Partial<userFormValues>,id:number|undefined){
    return this.http.put<User>(this.url+id,user)
  }

  deleteUser(id:number):Observable<User>{
    const userUrl= `${this.url}/${id}`;
    return this.http.delete<User>(userUrl,this.httpOptions);
  }

}
