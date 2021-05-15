import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Product} from '../../models/Pharmacie/product.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  dataUpdated = new Subject<any>();

  constructor(private http: HttpClient) { }
  getDatalistener(): Observable<any> {
    return this.dataUpdated as Observable<any>;
  }

  addProduct(name, description, price, image: File, stock): Observable<any> {
    const product = new FormData();
    product.append('name', name);
    product.append('description', description);
    product.append('price', price.toString());
    product.append('stock', stock.toString());
    product.append('image', image, name);
    return this.http.put('http://localhost:3000/pharmacies/addproduct', product);
  }

  updateProduct(id, name, description, price, stock, image?: File): Observable<any> {
    if (image) {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price.toString());
      product.append('stock', stock.toString());
      product.append('image', image, name);
      return this.http.put('http://localhost:3000/pharmacies/editproduct/' + id, product);
    }
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/pharmacies/product/' + id);
  }

  getDataByKey(): Observable<any> {
    return this.http.get('http://localhost:3000/pharmacies/getbykey');
  }

  search(city: string): Observable<any> {
    return this.http.put('http://localhost:3000/pharmacies/find', {city});
  }

  getProductbyid(productID: string): Observable<any> {
    return this.http.put('http://localhost:3000/pharmacies/getProductbyid', {productID});
  }

  getProduct(pharmacieID: string, productID: string): Observable<any> {
    return this.http.put('http://localhost:3000/pharmacies/getProduct', {pharmacieID, productID});
  }

  getAllPharmacies(): Observable<any> {
    return this.http.get('http://localhost:3000/pharmacies');
  }

  getPharmacie(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/pharmacies/' + id);
  }
  addReview(id: string, rate: number, title: string, review: string): Observable<any>{
    return this.http.post('http://localhost:3000/pharmacies/' + id + '/addreview', {rate, title, review});
  }
}
