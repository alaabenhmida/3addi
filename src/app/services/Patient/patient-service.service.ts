import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {environment} from '../../../environments/environment.prod';
const BACKEND_URL = environment.apiUrl + 'patient/';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  patientUpdate = new Subject();

  constructor(private http: HttpClient) {
  }

  getUpdatedPatient(): Observable<any> {
    return this.patientUpdate as Observable<any>;
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(BACKEND_URL + id);
  }

  getPatient(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + id);
  }

  verifypassword(password: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'verifyPassword', {password});
  }

  changepassword(password: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'changepassword', {password});
  }

  addInvoice(doctor: string, date: string, price: number, paymentMethod: string,
             cardNumber: string, rdvDate: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'addinvoice',
      {doctor, date, price, paymentMethod, cardNumber, rdvDate});
  }

  getCertificat(patiendId: string, certID: string): Observable<any> {
    return this.http.put(BACKEND_URL + patiendId + '/getcertificat', {certID});
  }

  getInvoice(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'invoice/' + id);
  }

  addFavourite(doctorId: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'addfav', {doctorId});
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
      return this.http.put(BACKEND_URL, patient);
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
      return this.http.put(BACKEND_URL, patient);
    }
  }


  getPatientByKey(): Observable<any> {
    return this.http.get(BACKEND_URL + 'getPatbykey');
  }

  getRdv(rdvId: string): Observable<any> {
    return this.http.get(BACKEND_URL + rdvId + '/getrdv/');
  }

  addInoicePharmaice(cart: any, pharmacie: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'addinvoicephar', {cart, pharmacie});
  }

  getInoicePharmaice(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'getinvoicePhar/' + id);
  }

  addRdv(id: string, rdvDate: string): Observable<any> {
    return this.http.post(BACKEND_URL + id + '/rdv',
      {
        appDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
        rdvDate
      });
  }

  getAllPAtient(): Observable<any> {
    return this.http.get(BACKEND_URL);
  }
}
