import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Product} from '../../models/Pharmacie/product.model';
import {FormGroup} from '@angular/forms';
import {CartItem} from '../../models/Pharmacie/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  dataUpdated = new Subject<any>();

  constructor(private http: HttpClient) { }
  getDatalistener(): Observable<any> {
    return this.dataUpdated as Observable<any>;
  }

  modify(name, email, address, city, state, country, zip, phone, type, awards, aboutMe, image?: File): Observable<any> {
    if (image) {
      const pharmacie = new FormData();
      pharmacie.append('name', name);
      pharmacie.append('email', email);
      pharmacie.append('address', address);
      pharmacie.append('city', city);
      pharmacie.append('state', state);
      pharmacie.append('country', country);
      pharmacie.append('zip', zip);
      pharmacie.append('phone', phone);
      pharmacie.append('type', type);
      pharmacie.append('aboutMe', aboutMe);
      pharmacie.append('image', image, name);
      pharmacie.append('awards', JSON.stringify(awards));
      return this.http.put('http://localhost:3000/pharmacies/edit', pharmacie);
    } else {
      const pharmacie = new FormData();
      pharmacie.append('name', name);
      pharmacie.append('email', email);
      pharmacie.append('address', address);
      pharmacie.append('city', city);
      pharmacie.append('state', state);
      pharmacie.append('country', country);
      pharmacie.append('zip', zip);
      pharmacie.append('phone', phone);
      pharmacie.append('type', type);
      pharmacie.append('aboutMe', aboutMe);
      pharmacie.append('awards', JSON.stringify(awards));
      return this.http.put('http://localhost:3000/pharmacies/edit', pharmacie);
    }
  }

  updatequantity(product: Product, quantity: number, date: string, pharmacieId: string): void {

    this.http.put('http://localhost:3000/pharmacies/decreasequantite', {product, quantity, date, pharmacieId})
      .subscribe(data => {
        console.log(data);
      });
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

  updateProduct(id, name, description, price, stock, image?: File): void {
    if (image) {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price.toString());
      product.append('stock', stock.toString());
      product.append('image', image, name);
      this.http.put('http://localhost:3000/pharmacies/editproduct/' + id, product).subscribe(data => {
        console.log('with image');
      });
    } else {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price.toString());
      product.append('stock', stock.toString());
      this.http.put('http://localhost:3000/pharmacies/editproduct/' + id, product).subscribe(data => {
        console.log('without image!!!!!!!');
      });
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
