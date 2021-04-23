import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {RDV} from '../../../models/Patient/rdv.model';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  rdv: RDV;
  bookingFees: number;
  private rdvId: string;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.rdvId = paramMap.get('rdvID');
      this.patientService.getRdv(paramMap.get('rdvID')).subscribe(result => {
        this.rdv = result.rdv[0];
        this.bookingFees = result.rdv[0].doctorId.price * 10 / 100;
      });
    });
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
  onClick(): void {
    this.router.navigate(['/ordre', this.rdvId]);
  }

}
