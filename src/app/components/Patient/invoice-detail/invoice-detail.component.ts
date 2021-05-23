import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import * as moment from 'moment';
import {Patient} from '../../../models/Patient/patient.model';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {Subscription} from 'rxjs';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  facture: any;
  patient: Patient;
  doctor: Doctor;
  role: string;
  roleSub: Subscription;
  constructor(public route: ActivatedRoute,
              private patientService: PatientServiceService,
              private doctorService: DoctorServiceService,
              private auth: PatientAuthService) { }

  ngOnInit(): void {
    this.role = this.auth.getRole();
    this.roleSub = this.auth.getRoleListener().subscribe(res => {
      this.role = res;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (this.role === 'patient') {
        this.patientService.getInvoice(paramMap.get('rdvid')).subscribe(result => {
          this.facture = result.invoices[0];
          this.doctor = result.invoices[0].doctor;
        });
        this.patientService.getPatientByKey().subscribe(patient => {
          this.patient = patient;
        });
      } else {
        this.doctorService.getInvoice(paramMap.get('rdvid')).subscribe(result => {
          this.facture = result.invoices[0];
          this.patient = result.invoices[0].patient;
        }, error => {
          console.log(error);
        });
        this.doctorService.getDcotorByKey().subscribe(doctor => {
          this.doctor = doctor;
        });
      }

    });
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  ngOnDestroy(): void {
    this.roleSub.unsubscribe();
  }
}
