import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProducts } from '../Model/userProducts';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://onelity.azurewebsites.net/user_products';

  getUserProducts(): Observable<UserProducts[]>{
    return this.http.get<UserProducts[]>(this.apiurl);
  }
}