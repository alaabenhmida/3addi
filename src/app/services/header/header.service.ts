import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isInPharmacie = new Subject<boolean>();
  pharmacieId = new Subject<string>();
  productNumber = new Subject<number>();

  constructor() { }
  getIsInPharmacie(): Observable<boolean> {
    return this.isInPharmacie as Observable<boolean>;
  }
  getpharmacieId(): Observable<string> {
    return this.pharmacieId as Observable<string>;
  }
  getProductNumber(): Observable<number> {
    return this.productNumber as Observable<number>;
  }
}
