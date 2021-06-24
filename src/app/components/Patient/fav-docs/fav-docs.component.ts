import {Component, OnInit} from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {Patient} from '../../../models/Patient/patient.model';
import * as moment from 'moment';

@Component({
  selector: 'app-fav-docs',
  templateUrl: './fav-docs.component.html',
  styleUrls: ['./fav-docs.component.css']
})
export class FavDocsComponent implements OnInit {
  favourits = [];
  patientdata: Patient;
  private today = moment(new Date()).toString();

  constructor(private patient: PatientServiceService) {
  }

  ngOnInit(): void {
    this.patient.getPatientByKey().subscribe(result => {
      this.patientdata = result;
      this.favourits = result.favDocs;
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  calculateAge(birthday): number { // birthday is a date
    const age = moment.duration(moment().diff(moment(birthday)));
    return Math.floor(age.asYears());
  }
}
