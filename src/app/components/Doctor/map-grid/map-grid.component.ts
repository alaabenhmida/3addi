import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {PageEvent} from '@angular/material/paginator';
import { get } from 'scriptjs';
declare var klokantech;

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent implements OnInit {
  doctors: Array<Doctor> = [];
  private today = moment(new Date()).toString();
  private isloggedIn = false;
  private isloggedInSub: Subscription;
  totalDoctors = 10;
  latitude = 51.673858;
  longitude = 7.815982;
  doctorsPerPage = 4;
  cuurentPage = 1;
  pageSizeOptions = [2, 4, 8, 10];
  lat = 51.678418;
  lng = 7.809007;
  zoom = 4;
  public origin: any;
  public destination: any;

  constructor(private doctorService: DoctorServiceService,
              private patientService: PatientServiceService,
              private authService: PatientAuthService) { }

  ngOnInit(): void {
    this.getDirection();
    this.setCurrentLocation();
    this.doctorService.getAllDoctors(this.doctorsPerPage, this.cuurentPage).subscribe(doctors => {
      this.doctors = doctors.doctors;
      this.totalDoctors = doctors.maxDoctors;
    });
    this.isloggedIn = this.authService.getIsAuth();
    this.isloggedInSub = this.authService.getAuthStatusListener().subscribe(
      auth => {
        this.isloggedIn = auth;
      }
    );
  }

  getDirection(): void {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  onAddFavDoc(doctorId: string): void {
    this.patientService.addFavourite(doctorId).subscribe(result => {
      console.log(result);
    });
  }

  onChangedPage(pageData: PageEvent): void {
    this.cuurentPage = pageData.pageIndex + 1;
    this.doctorsPerPage = pageData.pageSize;
    this.doctorService.getAllDoctors(this.doctorsPerPage, this.cuurentPage).subscribe(doctors => {
      this.doctors = doctors.doctors;
    });
  }

  placeMarker($event): void{
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }
}
