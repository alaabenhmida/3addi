import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

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
    return this.http.delete('http://localhost:3000/patient/' + id);
  }

  getPatient(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/patient/' + id);
  }

  verifypassword(password: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/verifyPassword', {password});
  }

  changepassword(password: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/changepassword', {password});
  }

  addInvoice(doctor: string, date: string, price: number, paymentMethod: string,
             cardNumber: string, rdvDate: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/addinvoice',
      {doctor, date, price, paymentMethod, cardNumber, rdvDate});
  }

  getCertificat(patiendId: string, certID: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/' + patiendId + '/getcertificat', {certID});
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

  addInoicePharmaice(cart: any, pharmacie: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/addinvoicephar', {cart, pharmacie});
  }

  getInoicePharmaice(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/patient/getinvoicePhar/' + id);
  }

  addRdv(id: string, rdvDate: string): Observable<any> {
    return this.http.post('http://localhost:3000/patient/' + id + '/rdv',
      {
        appDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
        rdvDate
      });
  }

  getAllPAtient(): Observable<any> {
    return this.http.get('http://localhost:3000/patient/');
  }
}
