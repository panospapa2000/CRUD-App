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

  getUsersbyId(Userid: any){
    return this.http.get(this.apiurl + '/' + Userid);
  }

  //createUser(): Observable<UserModel[]>{
    //return this.http.post<UserModel[]>(this.apiurl);
  //}

  updateUser(inputdata: UserModel){
    return this.http.put(this.apiurl, inputdata);
  }

  deleteUser(userId: number){
    return this.http.delete(this.apiurl + '/' + userId);
  }

  // getUserByID(userId: number){
  //   return this.http.get(this.apiurl + '/' + userId);
  // }
}
