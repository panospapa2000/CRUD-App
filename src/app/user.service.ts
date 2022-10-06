import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://onelity.azurewebsites.net/users';

  GetUsers(){
    return this.http.get(this.apiurl);
  }

  UpdateUser(inputdata: any){
    return this.http.post(this.apiurl, inputdata);
  }

  DeleteUser(Userid: any){
    return this.http.delete(this.apiurl + '/' + Userid);
  }
}
