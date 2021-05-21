import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {CartService} from '../../../services/pharmacie/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

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
  day = moment(Date.now()).format('DDMMYYYYHH:mm');

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieId = paramMap.get('id');
      this.cartService.getcart(paramMap.get('id'));
      this.products = this.cartService.products;
      this.pharmacieService.getPharmacie(paramMap.get('id')).subscribe(data => {
        this.pharmacieData = data;
      });
    });
    this.productsSub = this.cartService.productsSub().subscribe(products => {
      this.products = products;
      console.log(products);
      // console.log(products);
    });
  }

  public getTotal(): number {
    return this.cartService.getTotalAmount();
  }

  onclick(): void {
    this.products.forEach(product => {
      this.pharmacieService.updatequantity(product.product, product.quantity, this.day,
        this.pharmacieId);
    });
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
