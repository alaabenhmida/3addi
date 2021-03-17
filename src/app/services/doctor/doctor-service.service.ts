import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  medrecord: MedicalRecord;

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
}
