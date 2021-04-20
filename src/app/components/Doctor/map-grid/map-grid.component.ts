import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {PageEvent} from '@angular/material/paginator';

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
  doctorsPerPage = 5;
  cuurentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private doctorService: DoctorServiceService,
              private patientService: PatientServiceService,
              private authService: PatientAuthService) { }

  ngOnInit(): void {
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
}
