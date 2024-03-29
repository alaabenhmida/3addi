import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MedicalRecord} from '../../models/Doctor/medicalRecord.model';
import * as moment from 'moment';
import {environment} from '../../../environments/environment.prod';
const BACKEND_URL = environment.apiUrl;

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
    return this.http.put(BACKEND_URL + 'doctor/verifyPassword', {password});
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(BACKEND_URL + 'doctor/' + id);
  }

  deleteDoctorByKey(): Observable<any> {
    return this.http.delete(BACKEND_URL + 'doctor/delete');
  }

  getspecialityCount(speciality: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'doctor/speciality', {speciality});
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

      return this.http.put(BACKEND_URL + 'doctor', image);
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

      return this.http.put(BACKEND_URL + 'doctor', image);
    }
  }

  acceptRDV(patientId: string, appDate: string): void {
    this.http.post(BACKEND_URL + 'doctor/rdv/accept', {patientId, appDate})
      .subscribe(result => {
        console.log(result);
        this.getDcotorByKey().subscribe(data => {
          this.dataUpdated.next(data);
        });
      });
  }

  rejectRDV(patientId: string, appDate: string): void {
    this.http.post(BACKEND_URL + 'doctor/rdv/cancel', {patientId, appDate})
      .subscribe(result => {
        console.log(result);
        this.getDcotorByKey().subscribe(data => {
          this.dataUpdated.next(data);
        });
      });
  }

  getDoctor(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'doctor/' + id);
  }

  getDcotorByKey(): Observable<any> {
    return this.http.get(BACKEND_URL + 'doctor/getdocbykey');
  }

  getAllDoctors(postPerPage?: number, currentPage?: number): Observable<any> {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    return this.http.get(BACKEND_URL + 'doctor' + queryParams);
  }

  getInvoice(id: string): Observable<any> {
    return this.http.get(BACKEND_URL + 'doctor/invoice/' + id);
  }

  updatePrescription(patientId: string, prescID: string, presc: any, description: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/' + patientId + '/updatepresc', {prescID, presc, description});
  }

  search(name: string, genders?: string[], speciality?: string[]): Observable<any> {
    return this.http.put(BACKEND_URL + 'doctor/find', {name, genders, speciality});
  }

  workingTime(duration: number, from: string, to: string, breackTimes: any): Observable<any> {
    return this.http.put(BACKEND_URL + 'doctor/workingtimes', {duration, from, to, breackTimes});
  }

  getPrescription(patiendId: string, prescID: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/' + patiendId + '/getpresc', {prescID});
  }

  addPrescription(presc: string[], patientId: string, description: string): Observable<any> {
    return this.http.post(BACKEND_URL + 'doctor/patient/' + patientId + '/addpresc', {
      presc,
      date: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'), description
    });
  }

  addCertificat(patientId: string, from: string, to: string, description: string): Observable<any> {
    return this.http.post(BACKEND_URL + 'doctor/patient/' + patientId + '/addcertificat', {
      from, to,
      date: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss'), description
    });
  }

  deletePrescription(patientId: string, recId: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/' + patientId + '/delpresc', {recId});
  }

  addrecord(id: string, nom: string, desc: string, file: File): Observable<any> {
    const medrecord = new FormData();
    medrecord.append('nom', nom);
    medrecord.append('description', desc);
    medrecord.append('image', file, 'dossier medicale');
    // this.medrecord = {
    //   date,
    //   description : desc,
    //   file
    // };
    return this.http.put(BACKEND_URL + 'patient/' + id, medrecord);
  }

  deleteRecord(patientid: string, recId: string): Observable<any> {
    return this.http.put(BACKEND_URL + 'patient/' + patientid + '/delrecord', {recId});
  }

  addReview(id: string, rate: number, title: string, review: string): Observable<any> {
    return this.http.post(BACKEND_URL + 'doctor/' + id + '/addreview', {rate, title, review});
  }
}
