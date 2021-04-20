import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Doctor} from '../../models/Doctor/doctor.model';
import {DoctorServiceService} from '../../services/doctor/doctor-service.service';
import {PatientServiceService} from '../../services/Patient/patient-service.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  doctorsData: Doctor[];
  private isloggedIn = false;
  private isloggedInSub: Subscription;
  private today = moment(new Date()).toString();

  constructor(private doctorService: DoctorServiceService,
              private patientService: PatientServiceService,
              private authService: PatientAuthService) {
  }

  ngOnInit(): void {
    this.isloggedIn = this.authService.getIsAuth();
    this.isloggedInSub = this.authService.getAuthStatusListener().subscribe(
      auth => {
        this.isloggedIn = auth;
      }
    );
    this.doctorService.getAllDoctors(3, 1).subscribe(result => {
      this.doctorsData = result.doctors;
    });
  }

  onAddFavDoc(doctorId: string): void {
    this.patientService.addFavourite(doctorId).subscribe(result => {
      console.log(result);
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  ngOnDestroy(): void {
    this.isloggedInSub.unsubscribe();
  }
}
