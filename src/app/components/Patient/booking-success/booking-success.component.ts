import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {RDV} from '../../../models/Patient/rdv.model';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {
  rdv: RDV;

  constructor(public route: ActivatedRoute,
              private patientService: PatientServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getRdv(paramMap.get('rdvid')).subscribe(result => {
        this.rdv = result.rdv[0];
      });
    });
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

}
