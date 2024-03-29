import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthData} from '../auth-data';
import {ToastrService} from 'ngx-toastr';

import {environment} from '../../../environments/environment.prod';
const BACKEND_URL = environment.apiUrl;

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
  userimageListener = new Subject<string>();
  private useridListener = new Subject<string>();
  private usernameListener = new Subject<string>();
  private roleListener = new Subject<string>();
  private role: string;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  getRole(): string {
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

  getRoleListener(): Observable<any> {
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

  login(email: string, password: string): void {
    const authData: AuthData = {email, password};
    this.http
      .post<{ token: string; expiresIn: number, user: any, role: string }>(
        BACKEND_URL + 'patient/login',
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
          const userRole = response.role;
          this.user = response.user;
          this.authStatusListener.next(true);
          this.useridListener.next(userid);
          this.usernameListener.next(username);
          this.userimageListener.next(userimage);
          this.role = response.role;
          this.roleListener.next(userRole);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, userid, username, userimage, userRole);
          if (response.role === 'patient') {
            this.router.navigate(['/']);
          } else if (response.role === 'doctor') {
            this.router.navigate(['/doctor/profile/dashboard']);
          } else if (response.role === 'pharmacien') {
            this.router.navigate(['/pharmacie/dashboard']);
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
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
    this.role = null;
    this.userid = null;
    this.username = null;
    this.userimage = null;
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

  signup(email: string, password: string, image: File, name: string, lastName, gender: string, address: string,
         city: string, state: string, zip: string, country: string,
         birthday: string, bloodType: string, phone: string): void {
    const patientData = new FormData();
    patientData.append('email', email);
    patientData.append('password', password);
    patientData.append('image', image, name);
    patientData.append('name', name);
    patientData.append('lastName', lastName);
    patientData.append('gender', gender);
    patientData.append('address', address);
    patientData.append('city', city);
    patientData.append('state', state);
    patientData.append('zip', zip);
    patientData.append('country', country);
    patientData.append('birthday', birthday);
    patientData.append('bloodType', bloodType);
    patientData.append('phone', phone);
    this.http.post(BACKEND_URL + 'patient/signup', patientData)
      .subscribe(responsedata => {
        this.toastr.success('compte créé avec succès', '', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/login']);
      });
  }
}
