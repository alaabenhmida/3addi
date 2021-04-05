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
