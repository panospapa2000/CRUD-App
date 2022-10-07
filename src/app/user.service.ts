import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://onelity.azurewebsites.net/users';

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiurl);
  }

  deleteUser(userId: any){
    return this.http.delete(this.apiurl + '/' + userId);
  }
}
