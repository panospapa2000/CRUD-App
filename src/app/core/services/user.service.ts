import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
//import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';

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

  createUser(user:any){
    return this.http.post<any>(this.url,user,this.httpOptions);
  }

  updateUser(user:any,id:number){
    return this.http.put<any>(this.url+id,user)
  }

  deleteUser(id:number):Observable<User>{
    const userUrl= `${this.url}/${id}`;
    return this.http.delete<User>(userUrl,this.httpOptions);
  }

}
