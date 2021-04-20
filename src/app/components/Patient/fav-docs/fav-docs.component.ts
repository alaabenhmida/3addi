import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';

@Component({
  selector: 'app-fav-docs',
  templateUrl: './fav-docs.component.html',
  styleUrls: ['./fav-docs.component.css']
})
export class FavDocsComponent implements OnInit {
  favourits = [];

  constructor(private patient: PatientServiceService) { }

  ngOnInit(): void {
    this.patient.getPatientByKey().subscribe(result => {
      this.favourits = result.favDocs;
      console.log(this.favourits);
    });
  }

}
