import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  dataUpdated = new Subject<any>();

  constructor(private http: HttpClient) { }
  getDatalistener(): Observable<any> {
    return this.dataUpdated as Observable<any>;
  }

  search(city: string): Observable<any> {
    return this.http.put('http://localhost:3000/pharmacies/find', {city});
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
