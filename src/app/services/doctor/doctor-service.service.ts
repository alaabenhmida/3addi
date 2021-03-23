import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  medrecord: MedicalRecord;
  recid: string;

  constructor(private http: HttpClient) {
  }

  getDoctor(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/doctor/' + id);
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
    this.http.put('http://localhost:3000/patient/' + patientid + '/delpresc', recId).subscribe(response => {console.log(response); });
  }

  addReview(id: string, rate: number, title: string, review: string): void{
    this.http.post('http://localhost:3000/doctor/' + id + '/addreview', {rate, title, review}).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
