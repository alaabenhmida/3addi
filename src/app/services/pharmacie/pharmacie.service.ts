import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Product} from '../../models/Pharmacie/product.model';
import {CartItem} from '../../models/Pharmacie/cartItem.model';
import {environment} from '../../../environments/environment.prod';
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  dataUpdated = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getDatalistener(): Observable<any> {
    return this.dataUpdated as Observable<any>;
  }

  modify(name, email, address, city, state, country, zip, phone, type, awards, aboutMe,
         latitude: number, longitude: number, image?: File): Observable<any> {
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
      pharmacie.append('latitude', latitude.toString());
      pharmacie.append('longitude', longitude.toString());
      pharmacie.append('image', image, name);
      pharmacie.append('awards', JSON.stringify(awards));
      return this.http.put(BACKEND_URL + 'pharmacies/edit', pharmacie);
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
      pharmacie.append('latitude', latitude.toString());
      pharmacie.append('longitude', longitude.toString());
      pharmacie.append('awards', JSON.stringify(awards));
      return this.http.put(BACKEND_URL + 'pharmacies/edit', pharmacie);
    }
  }

  deleteCart(pharmacieID: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/deletecart', {pharmacieID});
  }

  signPrescription(pharmacie: string, prescID: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/signpresc', {pharmacie, prescID});
  }

  addOrder(cart: any, pharmacie: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'pharmacies/addorder', {cart, pharmacie});
  }

  getOrder(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'pharmacies/order/' + id);
  }

  updatequantity(product: Product, quantity: number, date: string, pharmacieId: string): void {

    this.http.put(BACKEND_URL + 'pharmacies/decreasequantite', {product, quantity, date, pharmacieId})
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
    return this.http.put(BACKEND_URL + 'pharmacies/addproduct', product);
  }

  updateProduct(id, name, description, price, stock, image?: File): void {
    if (image) {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price.toString());
      product.append('stock', stock.toString());
      product.append('image', image, name);
      this.http.put(BACKEND_URL + 'pharmacies/editproduct/' + id, product).subscribe(data => {
        console.log('with image');
      });
    } else {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price.toString());
      product.append('stock', stock.toString());
      this.http.put(BACKEND_URL + 'pharmacies/editproduct/' + id, product).subscribe(data => {
        console.log('without image!!!!!!!');
      });
    }
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(BACKEND_URL + 'pharmacies/product/' + id);
  }

  getDataByKey(): Observable<any> {
    return this.http.get(BACKEND_URL + 'pharmacies/getbykey');
  }

  search(city: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'pharmacies/find', {city});
  }

  byewithPresc(products: CartItem [], pharmacie): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/addtocart', {products, pharmacie});
  }

  getProductbyid(productID: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'pharmacies/getProductbyid', {productID});
  }

  getProduct(pharmacieID: string, productID: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'pharmacies/getProduct', {pharmacieID, productID});
  }

  getProductByName(pharmacieID: string, productName: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'pharmacies/getProductByName', {pharmacieID, productName});
  }

  getAllPharmacies(): Observable<any> {
    return this.http.get(BACKEND_URL + 'pharmacies');
  }

  getPharmacie(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'pharmacies/' + id);
  }

  addReview(id: string, rate: number, title: string, review: string): Observable<any> {
    return this.http.post(BACKEND_URL + 'pharmacies/' + id + '/addreview', {rate, title, review});
  }
}
