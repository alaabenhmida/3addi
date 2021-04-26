import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(private http: HttpClient) { }
  getPatient(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/patient/' + id);
  }

  addInvoice(doctor: string, date: string, price: number, paymentMethod: string,
             cardNumber: string, rdvDate: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/addinvoice',
      {doctor, date, price, paymentMethod, cardNumber, rdvDate});
  }

  getInvoice(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/patient/invoice/' + id);
  }

  addFavourite(doctorId: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/addfav', {doctorId});
  }

  modify(email: string, name: string, lastName: string, address: string, birthday: string,
         bloodType: string, phone: string, city: string, state: string,
         zip: string, country: string, image?: File): Observable<any> {
    if (image) {
      const patient = new FormData();
      patient.append('email', email);
      patient.append('name', name);
      patient.append('lastName', lastName);
      patient.append('address', address);
      patient.append('birthday', birthday);
      patient.append('bloodType', bloodType);
      patient.append('phone', phone);
      patient.append('city', city);
      patient.append('state', state);
      patient.append('zip', zip);
      patient.append('country', country);
      patient.append('image', image, name);
      return this.http.put('http://localhost:3000/patient', patient);
    } else {
      const patient = new FormData();
      patient.append('email', email);
      patient.append('name', name);
      patient.append('lastName', lastName);
      patient.append('address', address);
      patient.append('birthday', birthday);
      patient.append('bloodType', bloodType);
      patient.append('phone', phone);
      patient.append('city', city);
      patient.append('state', state);
      patient.append('zip', zip);
      patient.append('country', country);
      return this.http.put('http://localhost:3000/patient', patient);
    }
  }


  getPatientByKey(): Observable<any> {
    return this.http.get('http://localhost:3000/patient/getPatbykey');
  }

  getRdv(rdvId: string): Observable<any> {
    return this.http.get('http://localhost:3000/patient/' + rdvId + '/getrdv/');
  }

  addRdv(id: string, rdvDate: string): Observable<any> {
    return  this.http.post('http://localhost:3000/patient/' + id + '/rdv',
      {appDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
      rdvDate});
  }
}
