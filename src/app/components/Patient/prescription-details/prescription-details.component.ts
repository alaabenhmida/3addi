import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/Patient/patient.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent implements OnInit {
  patientData: any;
  prescData: any;
  prescId: string;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService,
              private doctorSevive: DoctorServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getPatientByKey().subscribe(patient => {
        this.patientData = patient;
        this.prescId = paramMap.get('id');
        this.doctorSevive.getPrescription(patient._id, paramMap.get('id')).subscribe(data => {
          this.prescData = data.prescription[0];
        });
      });
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).locale('fr').format(format));
  }
  print(): void {
    const printContent = document.getElementById('contenr');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
