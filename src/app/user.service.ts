import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  apiurl = 'http://onelity.azurewebsites.net/users';

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiurl);
  }

  getUsersbyId(userId: number): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiurl + '/' + userId);
  }

  createUser(inputdata: UserModel): Observable<UserModel[]>{
    return this.http.post<UserModel[]>(this.apiurl, inputdata);
  }

  updateUser(inputdata: UserModel, userId: number): Observable<UserModel[]>{
    return this.http.put<UserModel[]>(this.apiurl + '/' + userId, inputdata);
  }

  deleteUser(userId: number){
    return this.http.delete(this.apiurl + '/' + userId);
  }
}
