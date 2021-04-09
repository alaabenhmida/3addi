import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';
import * as moment from 'moment';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';
import {Doctor} from '../../models/Doctor/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  medrecord: MedicalRecord;
  recid: string;

  constructor(private http: HttpClient) {
  }

  modify(firstName: string, lastName: string, phone: string, gender: string, birthday: string,
         education, experience,
         awards, memberships, registrations, images?: File): void {
    if (images) {
      const image = new FormData();
      image.append('firstName', firstName);
      image.append('lastName', lastName);
      image.append('phone', phone);
      image.append('gender', gender);
      image.append('birthday', birthday);
      image.append('education', JSON.stringify(education));
      image.append('experience', JSON.stringify(experience));
      image.append('awards', JSON.stringify(awards));
      image.append('memberships', JSON.stringify(memberships));
      image.append('registrations', JSON.stringify(registrations));
      image.append('image', images, firstName);

      this.http.put<Doctor>('http://localhost:3000/doctor', image).subscribe(result => {
        console.log(result);
      });
    } else {
      const image = new FormData();
      image.append('firstName', firstName);
      image.append('lastName', lastName);
      image.append('phone', phone);
      image.append('gender', gender);
      image.append('birthday', birthday);
      image.append('education', JSON.stringify(education));
      image.append('experience', JSON.stringify(experience));
      image.append('awards', JSON.stringify(awards));
      image.append('memberships', JSON.stringify(memberships));
      image.append('registrations', JSON.stringify(registrations));

      this.http.put('http://localhost:3000/doctor', image).subscribe(result => {
        console.log(result);
      });
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
