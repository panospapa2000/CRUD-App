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

  getUsersbyId(userId: number){
    return this.http.get(this.apiurl + '/' + userId);
  }

  createUser(inputdata: any){
    return this.http.post(this.apiurl, inputdata);
  }

  updateUser(inputdata: UserModel, UserID: number){
    return this.http.put(this.apiurl + '/' + UserID, inputdata);
  }

  deleteUser(userId: number){
    return this.http.delete(this.apiurl + '/' + userId);
  }
}
