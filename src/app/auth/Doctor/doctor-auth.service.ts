import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Doctor} from '../../models/Doctor/doctor.model';
import {AuthData} from '../auth-data';

import {environment} from '../../../environments/environment.prod';
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user: Doctor;
  private userimage: string;
  private userid: string;
  private username: string;
  private userimageListener = new Subject<string>();
  private useridListener = new Subject<string>();
  private usernameListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserid(): string {
    return this.userid;
  }

  getUsername(): string {
    return this.username;
  }

  getUserimage(): string {
    return this.userimage;
  }

  getUser(): Doctor {
    return this.user;
  }

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getuserimageListener(): Observable<any> {
    return this.userimageListener.asObservable();
  }

  getuseridListener(): Observable<any> {
    return this.useridListener.asObservable();
  }

  getusernameListener(): Observable<any> {
    return this.usernameListener.asObservable();
  }

  getAuthStatusListener(): Observable<any> {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string): void {
    const authData: AuthData = {email, password};
    this.http
      .post<{ token: string; expiresIn: number, user: any }>(
        BACKEND_URL + 'doctor/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          const userid = response.user._id;
          const username = response.user.name;
          const userimage = response.user.imagePath;
          this.user = response.user;
          this.authStatusListener.next(true);
          this.useridListener.next(userid);
          this.usernameListener.next(username);
          this.userimageListener.next(userimage);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(this.user);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, userid, username, userimage);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.userid = authInformation.userid;
      this.useridListener.next(authInformation.userid);
      this.username = authInformation.username;
      this.userimage = authInformation.userimage;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userid: string, username: string, userimage: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userid', userid);
    localStorage.setItem('username', username);
    localStorage.setItem('userimage', userimage);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('userimage');
    localStorage.removeItem('user');
  }

  private getAuthData(): any {
    const userid = localStorage.getItem('userid');
    const username = localStorage.getItem('username');
    const userimage = localStorage.getItem('userimage');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userid,
      username,
      userimage
    };
  }

  signup(email: string, password: string,
         image: string, name: string,
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
  ): Observable<any> {
    const doctorData = new FormData();
    doctorData.append('email', email);
    doctorData.append('password', password);
    doctorData.append('image', image);
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
    return this.http.post(BACKEND_URL + 'doctor/signup', doctorData);
  }
}
