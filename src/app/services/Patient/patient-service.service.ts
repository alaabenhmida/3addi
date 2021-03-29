import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(private http: HttpClient) { }
  getPatient(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/patient/' + id);
  }
  addRdv(id: string, rdvDate: Date): void {
    this.http.post('http://localhost:3000/patient/' + id + '/rdv', {appDate: new Date().toJSON(), rdvDate: rdvDate.toJSON()}).subscribe(result => {
      console.log(result);
    });
  }
}
