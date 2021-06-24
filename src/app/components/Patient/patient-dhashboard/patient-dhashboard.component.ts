import {Component, OnInit} from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Patient} from '../../../models/Patient/patient.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-patient-dhashboard',
  templateUrl: './patient-dhashboard.component.html',
  styleUrls: ['./patient-dhashboard.component.css']
})
export class PatientDhashboardComponent implements OnInit {
  patientdata: Patient;
  medicalRecord: string[];
  prescription = [];
  invoices = [];
  certificats = [];

  constructor(private patientService: PatientServiceService,
              private router: Router,
              private doctorService: DoctorServiceService) {
  }

  ngOnInit(): void {
    this.patientService.getPatientByKey().subscribe(data => {
      this.patientdata = {
        id: data._id,
        email: data.email,
        password: data.password,
        imagePath: data.imagePath,
        name: data.name,
        lastName: data.lastName,
        address: data.address,
        birthday: data.birthday,
        bloodType: data.bloodType,
        phone: data.phone,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        rdv: data.rdv
      };
      this.medicalRecord = data.medicalRecord;
      this.prescription = data.prescription;
      this.invoices = data.invoices;
      this.certificats = data.certificat;
    });
  }

  getdate(date: string, format: string): string {
    return (moment(date).format(format));
  }

  calculateAge(birthday): number { // birthday is a date
    const age = moment.duration(moment().diff(moment(birthday)));
    return Math.floor(age.asYears());
  }

  isAfter(date: string): boolean {
    return moment(date).isAfter(new Date());
  }

  bye(id: string): void {
    this.router.navigate(['/pharmacies'], {
      queryParams: {
        ordID: id,
        patientId: this.patientdata.id
      }
    });
  }
}
