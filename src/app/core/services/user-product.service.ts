import { Injectable } from '@angular/core';
import { UserProduct } from '../model/userProduct';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserProductService {

  constructor(private http:HttpClient) { }

  url='http://onelity.azurewebsites.net/user_products/'

  getUserProducts():Observable<UserProduct[]>{
    return this.http.get<UserProduct[]>(this.url);
  }

}
