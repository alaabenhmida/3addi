import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Patient} from '../../../models/Patient/patient.model';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-dhashboard',
  templateUrl: './patient-dhashboard.component.html',
  styleUrls: ['./patient-dhashboard.component.css']
})
export class PatientDhashboardComponent implements OnInit {
  patientdata: Patient;
  medicalRecord: string[];
  prescription = [];

  constructor(private patientService: PatientServiceService) { }

  ngOnInit(): void {
    this.patientService.getPatientByKey().subscribe(data => {
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
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }

}