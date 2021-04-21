import {Component, OnDestroy, OnInit} from '@angular/core';
import {Patient} from '../../../models/Patient/patient.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {Subscription} from 'rxjs';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  id: string;
  patientdata: Patient;
  medicalRecord: string[];
  prescription = [];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  userId: string;
  isLoading = true;

  constructor(public route: ActivatedRoute, public patient: PatientServiceService, private authService: PatientAuthService,
              private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.patient.getPatient(this.id).subscribe(data => {
        if (data) {
          this.patientdata = {
            id : data._id,
            email : data.email,
            password : data.password,
            imagePath : data.imagePath,
            name : data.name,
            lastName: data.lastName,
            address : data.address,
            birthday : data.birthday,
            bloodType : data.bloodType,
            phone : data.phone,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country,
            rdv : data.rdv
          };
          this.medicalRecord = data.medicalRecord;
          this.prescription = data.prescription;

        } else {
          console.log('not found!!');
        }
        console.log(data.prescription[0]._id);
      });
    });
    this.userId = this.authService.getUserid();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserid();
      });
  }
  onDelete(patienttid: string, recid: string): void {
    this.doctorService.deleteRecord(patienttid, recid);
}
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}
