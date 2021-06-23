import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../../services/pharmacie/cart.service';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {combineLatest} from 'rxjs';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Product} from '../../../models/Pharmacie/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  products: CartItem[] = [];
  productsSub: Subscription;
  pharmacieId: string;
  ordonnanceMode = false;
  prescID: string;
  patientId: string;
  public currency = 'USD';

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router,
              private doctorService: DoctorServiceService,
              private pharmacieService: PharmacieService) {
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params.ordID && params.patientId) {
    //     this.prescID = params.ordID;
    //     this.patientId = params.patientId;
    //     this.ordonnanceMode = true;
    //   }
    // });
    combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({params, qparams}))
      .subscribe(allParams => {
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
      // console.log(products);
    });
  }

// Increase Product Quantity
  public increment(product: any, quantity: number = 1): void {
    this.cartService.updateCartQuantity(product, quantity, this.pharmacieId);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1): void {
    this.cartService.updateCartQuantity(product, quantity, this.pharmacieId);
  }

  // Get Total
  public getTotalAmount(): number {
    // return this.cartItems.pipe(map((product: CartItem[]) => {
    return this.products.reduce((prev, curr: CartItem) => {
      return prev + curr.product.price * curr.quantity;
    }, 0);
    // }));
  }

  public getTotal(): number {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item, this.pharmacieId);
  }

  onAcheter(): void {
    if (this.ordonnanceMode) {
      this.router.navigate(['/pharmacie', this.pharmacieId, 'payer'], {
        queryParams: {
          ordID: this.prescID,
          patientId: this.patientId
        }
      });
    } else {
      this.router.navigate(['/pharmacie', this.pharmacieId, 'payer']);
    }
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
