import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {RDV} from '../../../models/Patient/rdv.model';
import * as moment from 'moment';
// import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
// import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {PaymentService} from '../../../services/payment/payment.service';
import {Patient} from '../../../models/Patient/patient.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  rdv: any;
  bookingFees: number;
  private rdvId: string;
  private today = moment(new Date()).toString();
  private price: number;
  private patient: Patient;

  element: Element;
  // card: StripeElement;
  paymentStatus: any;
  stripData: any;
  submitted: any;
  loading: any;

  // elementsOptions: ElementsOptions = {
  //   locale: 'en'
  // };
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };

  stripeTest: FormGroup;

  stripeForm: FormGroup;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private patientService: PatientServiceService,
              private doctorService: DoctorServiceService,
              private fb: FormBuilder, private stripeService: StripeService,
              private paymentService: PaymentService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
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

  createToken(): void {
    this.spinner.show();
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, {name})
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          // console.log(result.token);
          // this.stripData.token = result.token;
          this.paymentService.pay(result.token, this.rdv.doctorId.price).subscribe(res => {
            if (res.success) {
              this.paymentStatus = res.status;
              this.patientService.addInvoice(this.rdv.doctorId, this.today, this.price,
                res.charge.payment_method_details.card.brand, res.charge.payment_method_details.card.last4, this.rdv.rdvDate)
                .subscribe(results => {
                  this.spinner.hide();
                  this.router.navigate(['/ordre', results.invoiceID]);
                });
            }
          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.paymentStatus = result.error.message;
        }
      });
  }
}
