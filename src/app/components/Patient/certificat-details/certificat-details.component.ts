import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-certificat-details',
  templateUrl: './certificat-details.component.html',
  styleUrls: ['./certificat-details.component.css']
})
export class CertificatDetailsComponent implements OnInit {
  patientData: any;
  certificatData: any;
  certificatId: string;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getPatientByKey().subscribe(patient => {
        this.patientData = patient;
        this.certificatId = paramMap.get('id');
        this.patientService.getCertificat(patient._id, paramMap.get('id')).subscribe(data => {
          this.certificatData = data.certificat[0];
          console.log(data.certificat[0]);
        });
      });
    });
  }

  getdate(date: string, format: string): string {
    return (moment(date).locale('fr').format(format));
  }
}
