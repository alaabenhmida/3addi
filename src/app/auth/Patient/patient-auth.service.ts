import { Injectable } from '@angular/core';
import {Patient} from '../../models/Patient/patient.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthData} from '../auth-data';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user: any;
  private userimage: string;
  private userid: string;
  private username: string;
  private userimageListener = new Subject<string>();
  private useridListener = new Subject<string>();
  private usernameListener = new Subject<string>();
  private roleListener = new Subject<string>();
  private role: string;

  constructor(private http: HttpClient, private router: Router) { }

  getRole(): string{
    return this.role;
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
  getUser(): any {
    return this.user;
  }
  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getRoleListener(): Observable<any>{
    return this.roleListener.asObservable();
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
  login(email: string, password: string, role: string): void {
    this.role = role;
    const authData: AuthData = { email, password };
    if (role === 'patient'){
      this.http
        .post<{ token: string; expiresIn: number, user: any }>(
          'http://localhost:3000/patient/login',
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
            this.roleListener.next('patient');
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(this.user);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, userid, username, userimage, role);
            this.router.navigate(['/']);
          }
        });
    } else {
      this.http
        .post<{ token: string; expiresIn: number, user: any }>(
          'http://localhost:3000/doctor/login',
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
            this.roleListener.next('doctor');
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(this.user);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, userid, username, userimage, role);
            this.router.navigate(['/']);
          }
        });
    }
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
      this.username = authInformation.username;
      this.userimage = authInformation.userimage;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.roleListener.next(authInformation.role);
      this.role = authInformation.role;
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

  private saveAuthData(token: string, expirationDate: Date, userid: string, username: string, userimage: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userid', userid);
    localStorage.setItem('username', username);
    localStorage.setItem('userimage', userimage);
    localStorage.setItem('role', role);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('userimage');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  private getAuthData(): any {
    const userid = localStorage.getItem('userid');
    const username = localStorage.getItem('username');
    const userimage = localStorage.getItem('userimage');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const role = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userid,
      username,
      userimage,
      role
    };
  }
  signup(email: string, password: string, image: File, name: string, address: string,
         birthday: string, bloodType: string, phone: string): void {
    const patientData = new FormData();
    patientData.append('email', email);
    patientData.append('password', password);
    patientData.append('image', image, name);
    patientData.append('name', name);
    patientData.append('address', address);
    patientData.append('birthday', birthday);
    patientData.append('bloodType', bloodType);
    patientData.append('phone', phone);
    this.http.post('http://localhost:3000/doctor/signup', patientData)
      .subscribe(responsedata => {
        console.log(responsedata);
      });
  }
}
