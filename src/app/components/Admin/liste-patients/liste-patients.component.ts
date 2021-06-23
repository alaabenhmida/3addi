import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {

  patients: any;

  constructor(private patientService: PatientServiceService) { }

  ngOnInit(): void {
    this.patientService.getAllPAtient().subscribe(patients => {
      this.patients = patients.posts;
    });
  }
  ondelete(id: string): void {
    this.patientService.deleteUser(id).subscribe(data => {
      console.log(data);
    });
  }

}
