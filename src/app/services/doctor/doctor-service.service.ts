import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  medrecord: MedicalRecord;
  recid: string;

  constructor(private http: HttpClient) {
  }

  modify(firstName: string, lastName: string, phone: string, gender: string, birthday: string,
         address1: string, address2: string, city: string, state: string,
         country: string, zip: string,
         education, experience,
         awards, memberships, registrations, images?: File): Observable<any> {
    if (images) {
      const image = new FormData();
      image.append('firstName', firstName);
      image.append('lastName', lastName);
      image.append('phone', phone);
      image.append('gender', gender);
      image.append('birthday', birthday);
      image.append('address1', address1);
      image.append('address2', address2);
      image.append('city', city);
      image.append('state', state);
      image.append('country', country);
      image.append('zip', zip);
      image.append('education', JSON.stringify(education));
      image.append('experience', JSON.stringify(experience));
      image.append('awards', JSON.stringify(awards));
      image.append('memberships', JSON.stringify(memberships));
      image.append('registrations', JSON.stringify(registrations));
      image.append('image', images, firstName);

      return this.http.put('http://localhost:3000/doctor', image);
    } else {
      const image = new FormData();
      image.append('firstName', firstName);
      image.append('lastName', lastName);
      image.append('phone', phone);
      image.append('gender', gender);
      image.append('birthday', birthday);
      image.append('address1', address1);
      image.append('address2', address2);
      image.append('city', city);
      image.append('state', state);
      image.append('country', country);
      image.append('zip', zip);
      image.append('education', JSON.stringify(education));
      image.append('experience', JSON.stringify(experience));
      image.append('awards', JSON.stringify(awards));
      image.append('memberships', JSON.stringify(memberships));
      image.append('registrations', JSON.stringify(registrations));

      return this.http.put('http://localhost:3000/doctor', image);
    }
  }

  acceptRDV(patientId: string, appDate: string): void{
    this.http.post('http://localhost:3000/doctor/rdv/accept', {patientId, appDate})
      .subscribe(result => {
        console.log(result);
      });
  }

  rejectRDV(patientId: string, appDate: string): void{
    this.http.post('http://localhost:3000/doctor/rdv/cancel', {patientId, appDate})
      .subscribe(result => {
        console.log(result);
      });
  }

  getDoctor(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/doctor/' + id);
  }

  getDcotorByKey(): Observable<any> {
    return this.http.get('http://localhost:3000/doctor/getdocbykey');
  }

  getAllDoctors(postPerPage?: number, currentPage?: number): Observable<any> {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    return this.http.get('http://localhost:3000/doctor' + queryParams);
  }

  getInvoice(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/doctor/invoice/' + id);
  }

  updatePrescription(patientId: string, prescID: string, presc: any): void {
    this.http.put('http://localhost:3000/patient/' + patientId + '/updatepresc', {prescID, presc})
      .subscribe(result => {
        console.log(result);
      });
  }

  getPrescription(patiendId: string, prescID: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/' + patiendId + '/getpresc', {prescID});
  }

  addPrescription(presc: string[], patientId: string): void {
    this.http.post('http://localhost:3000/doctor/patient/' + patientId + '/addpresc', {presc,
    date: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss')})
      .subscribe(data => {
        console.log(data);
      });
  }

  addrecord(id: string, date: string, desc: string, file: string): void{
    this.medrecord = {
      date,
      description : desc,
      file
    };
    this.http.put('http://localhost:3000/patient/' + id, this.medrecord).subscribe(response => {console.log(response); });
  }
  deleteRecord(patientid: string, recId: string): void{
    this.http.put('http://localhost:3000/patient/' + patientid + '/delpresc', {recId })
      .subscribe(response => {console.log(response); });
  }

  addReview(id: string, rate: number, title: string, review: string): void{
    this.http.post('http://localhost:3000/doctor/' + id + '/addreview', {rate, title, review}).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
