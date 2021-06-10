import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  signupPharmacie(email: string, password: string,
                  image: string, name: string,
                  address: string,
                  speciality: string,
                  phone: string,
                  city: string,
                  state: string,
                  country: string,
                  zip: string,
                  latitude: number,
                  longitude: number
  ): Observable<any> {
    const doctorData = new FormData();
    doctorData.append('email', email);
    doctorData.append('password', password);
    doctorData.append('image', image);
    doctorData.append('name', name);
    doctorData.append('address', address);
    doctorData.append('speciality', speciality);
    doctorData.append('phone', phone);
    doctorData.append('city', city);
    doctorData.append('state', state);
    doctorData.append('country', country);
    doctorData.append('zip', zip);
    doctorData.append('latitude', latitude.toString());
    doctorData.append('longitude', longitude.toString());
    return this.http.post('http://localhost:3000/pharmacies/signup', doctorData);
  }

  sendmail(to: string, subject: string, text: string): Observable<any> {
    return this.http.post('http://localhost:3000/admin/sendmail', {to, subject, text});
  }

  delDoctor(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/admin/deldoc/' + id);
  }

  delPharmacie(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/admin/delphar/' + id);
  }

  getAdmin(): Observable<any> {
    return this.http.get('http://localhost:3000/admin');
  }

  getDoctor(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getdoctor/' + id);
  }

  getPharmacie(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getpharmacie/' + id);
  }

  addDoctor(email: string, password: string,
            image: File, name: string,
            lastName: string,
            address: string,
            speciality: string,
            birthday: string,
            price: string,
            phone: string,
            gender: string,
            city: string,
            state: string,
            country: string,
            zip: string,
            latitude: number,
            longitude: number
  ): void {
    const doctorData = new FormData();
    doctorData.append('email', email);
    doctorData.append('password', password);
    doctorData.append('image', image, name);
    doctorData.append('name', name);
    doctorData.append('lastName', lastName);
    doctorData.append('address', address);
    doctorData.append('speciality', speciality);
    doctorData.append('birthday', birthday);
    doctorData.append('price', price);
    doctorData.append('phone', phone);
    doctorData.append('gender', gender);
    doctorData.append('city', city);
    doctorData.append('state', state);
    doctorData.append('country', country);
    doctorData.append('zip', zip);
    doctorData.append('latitude', latitude.toString());
    doctorData.append('longitude', longitude.toString());
    this.http.post('http://localhost:3000/admin/adddoctor', doctorData)
      .subscribe(responsedata => {
        console.log(responsedata);
      }, error => {
        console.log(error);
      });
  }

  addPharmacie(email: string, password: string,
               image: File, name: string,
               address: string,
               speciality: string,
               phone: string,
               city: string,
               state: string,
               country: string,
               zip: string,
               latitude: number,
               longitude: number
  ): void {
    const doctorData = new FormData();
    doctorData.append('email', email);
    doctorData.append('password', password);
    doctorData.append('image', image, name);
    doctorData.append('name', name);
    doctorData.append('address', address);
    doctorData.append('speciality', speciality);
    doctorData.append('phone', phone);
    doctorData.append('city', city);
    doctorData.append('state', state);
    doctorData.append('country', country);
    doctorData.append('zip', zip);
    doctorData.append('latitude', latitude.toString());
    doctorData.append('longitude', longitude.toString());
    this.http.post('http://localhost:3000/admin/addpharmacie', doctorData)
      .subscribe(responsedata => {
        console.log(responsedata);
      }, error => {
        console.log(error);
      });
  }

}
