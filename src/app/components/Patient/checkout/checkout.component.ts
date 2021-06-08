import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {RDV} from '../../../models/Patient/rdv.model';
import * as moment from 'moment';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  rdv: RDV;
  bookingFees: number;
  private rdvId: string;
  private today = moment(new Date()).toString();
  private price: number;

  element: Element;
  card: StripeElement;
  paymentStatus: any;
  stripData: any;
  submitted: any;
  loading: any;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  stripeForm: FormGroup;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService,
              private doctorService: DoctorServiceService,
              private stripeService: StripeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.rdvId = paramMap.get('rdvID');
      this.patientService.getRdv(paramMap.get('rdvID')).subscribe(result => {
        this.rdv = result.rdv[0];
        this.bookingFees = result.rdv[0].doctorId.price * 10 / 100;
        this.doctorService.getDoctor(result.rdv[0].doctorId._id).subscribe(result => {
          this.price = result.price;
        });
      });
    });
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
  onClick(): void {
    this.patientService.addInvoice(this.rdv.doctorId, this.today, this.price,
      'master Card', '123456789', this.rdv.rdvDate)
      .subscribe(result => {
        this.router.navigate(['/ordre', result.invoiceID]);
      });
  }
}
