import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../Model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://onelity.azurewebsites.net/products';

  getProducts(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.apiurl);
  }
}
