import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {CartService} from '../../../services/pharmacie/cart.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import * as moment from 'moment';
import {Product} from '../../../models/Pharmacie/product.model';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';

@Component({
  selector: 'app-pharmacie-checkout',
  templateUrl: './pharmacie-checkout.component.html',
  styleUrls: ['./pharmacie-checkout.component.css']
})
export class PharmacieCheckoutComponent implements OnInit, OnDestroy {
  products: CartItem[] = [];
  private pharmacieId: string;
  productsSub: Subscription;
  pharmacieData: Pharmacie;
  public currency = 'USD';
  prescID: string;
  patientId: string;
  ordonnanceMode = false;
  day = moment(Date.now()).format('DDMMYYYYHH:mm');

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router,
              private pharmacieService: PharmacieService,
              private doctorService: DoctorServiceService,
              private patientService: PatientServiceService) { }

  ngOnInit(): void {
    combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }))
      .subscribe(allParams => {
        this.pharmacieService.getPharmacie(allParams.params.id).subscribe(data => {
          this.pharmacieData = data;
        });
        if (allParams.qparams.ordID && allParams.qparams.patientId) {
          this.prescID = allParams.qparams.ordID;
          this.patientId = allParams.qparams.patientId;
          this.ordonnanceMode = true;
          this.pharmacieId = allParams.params.id;
          this.doctorService.getPrescription(this.patientId, this.prescID).subscribe(data => {
            data.prescription[0].presc.map(product => {
              this.pharmacieService.getProductByName(allParams.params.id, product.name).subscribe(products => {
                let prod: Product;
                prod = products;
                this.products.push({product: prod, quantity: product.quantite});
              });
            });
          });
        } else {
          this.pharmacieId = allParams.params.id;
          this.cartService.getcart(allParams.params.id);
          this.products = this.cartService.products;
          this.ordonnanceMode = false;
        }
        // console.log(allParams.params, allParams.qparams);
      });

    this.productsSub = this.cartService.productsSub().subscribe(products => {
      this.products = products;
    });
  }

  public getTotal(): number {
    return this.cartService.getTotalAmount();
  }

  updatequantites(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.products.map(product => {
          this.pharmacieService.updatequantity(product.product, product.quantity, this.day,
            this.pharmacieId);
        });
      resolve();
    });
  }

  onclick(): void {
    if (!this.ordonnanceMode) {
      this.patientService.addInoicePharmaice(this.products, this.pharmacieId).subscribe(res => {
        this.updatequantites().then(() => {
          this.pharmacieService.addOrder(this.products, this.pharmacieId).subscribe(data => {
            this.pharmacieService.deleteCart(this.pharmacieId).subscribe(result => {
              this.router.navigate(['pharmacie', this.pharmacieId, 'payer', 'succee'], {
                queryParams: {
                  invoiceId: res
                }
              });
            });
          });
        });
      });
    } else {
      this.patientService.addInoicePharmaice(this.products, this.pharmacieId).subscribe(res => {
        console.log(res);
        this.updatequantites().then(() => {
          this.pharmacieService.addOrder(this.products, this.pharmacieId).subscribe(data => {
            this.pharmacieService.deleteCart(this.pharmacieId).subscribe(result => {
              this.pharmacieService.signPrescription(this.pharmacieId, this.prescID).subscribe(resultat => {
                this.router.navigate(['pharmacie', this.pharmacieId, 'payer', 'succee'], {
                  queryParams: {
                    invoiceId: res
                  }
                });
              });
            });
          });
        });
      });
    }
  }

  public getTotalAmount(): number {
    // return this.cartItems.pipe(map((product: CartItem[]) => {
    return this.products.reduce((prev, curr: CartItem) => {
      return prev + curr.product.price * curr.quantity;
    }, 0);
    // }));
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
