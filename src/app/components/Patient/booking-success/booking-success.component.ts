import {Component, OnInit} from '@angular/core';
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
  rdv: any;
  id: string;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('rdvid');
      this.patientService.getInvoice(paramMap.get('rdvid')).subscribe(result => {
        this.rdv = result.invoices[0];
      });
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
}
