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

  getPatientByKey(): Observable<any> {
    return this.http.get('http://localhost:3000/patient/getPatbykey');
  }

  addRdv(id: string, rdvDate: string): void {
    this.http.post('http://localhost:3000/patient/' + id + '/rdv',
      {appDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
      rdvDate}).subscribe(result => {
      console.log(result);
    });
  }
}
