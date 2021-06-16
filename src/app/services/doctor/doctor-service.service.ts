import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  medrecord: MedicalRecord;
  recid: string;
  dataUpdated = new Subject<any>();
  // specialityUpdate = new Subject();

  constructor(private http: HttpClient) {
  }

  verifypassword(password: string): Observable<any> {
    return this.http.put('http://localhost:3000/doctor/verifyPassword', {password});
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/doctor/' + id);
  }
  deleteDoctorByKey(): Observable<any> {
    return this.http.delete('http://localhost:3000/doctor/delete');
  }

  getspecialityCount(speciality: string): Observable<any> {
    return this.http.put('http://localhost:3000/doctor/speciality', {speciality});
  }
   getDatalistener(): Observable<any> {
     return this.dataUpdated as Observable<any>;
   }

   // getspecialityUpdateListener(): Observable<any> {
   //  return this.specialityUpdate as Observable<any>;
   // }

  modify(firstName: string, lastName: string, phone: string, gender: string, birthday: string,
         address1: string, address2: string, city: string, state: string,
         country: string, zip: string, price: number, aboutMe: string, latitude: number, longitude: number,
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
      image.append('price', price.toString());
      image.append('aboutMe', aboutMe);
      image.append('latitude', latitude.toString());
      image.append('longitude', longitude.toString());
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
      image.append('price', price.toString());
      image.append('aboutMe', aboutMe);
      image.append('latitude', latitude.toString());
      image.append('longitude', longitude.toString());
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
        this.getDcotorByKey().subscribe(data => {
          this.dataUpdated.next(data);
        });
      });
  }

  rejectRDV(patientId: string, appDate: string): void{
    this.http.post('http://localhost:3000/doctor/rdv/cancel', {patientId, appDate})
      .subscribe(result => {
        console.log(result);
        this.getDcotorByKey().subscribe(data => {
          this.dataUpdated.next(data);
        });
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

  updatePrescription(patientId: string, prescID: string, presc: any): Observable<any> {
    return  this.http.put('http://localhost:3000/patient/' + patientId + '/updatepresc', {prescID, presc});
  }

  search(name: string, genders?: string[], speciality?: string[]): Observable<any> {
    return this.http.put('http://localhost:3000/doctor/find', {name, genders, speciality});
  }

  workingTime(duration: number, from: string, to: string, breackTimes: any): Observable<any> {
    return this.http.put('http://localhost:3000/doctor/workingtimes', {duration, from, to, breackTimes});
  }

  getPrescription(patiendId: string, prescID: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/' + patiendId + '/getpresc', {prescID});
  }

  addPrescription(presc: string[], patientId: string): Observable<any> {
    return  this.http.post('http://localhost:3000/doctor/patient/' + patientId + '/addpresc', {presc,
    date: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss')});
  }

  deletePrescription(patientId: string, recId: string): Observable<any> {
    return this.http.put('http://localhost:3000/patient/' + patientId + '/delpresc', {recId});
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
    this.http.put('http://localhost:3000/patient/' + patientid + '/delrecord', {recId })
      .subscribe(response => {console.log(response); });
  }

  addReview(id: string, rate: number, title: string, review: string): Observable<any>{
    return this.http.post('http://localhost:3000/doctor/' + id + '/addreview', {rate, title, review});
  }
}
