import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../../services/pharmacie/cart.service';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  products: CartItem[] = [];
  productsSub: Subscription;
  pharmacieId: string;
  public currency = 'USD';

  constructor(private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieId = paramMap.get('id');
      this.cartService.getcart(paramMap.get('id'));
      this.products = this.cartService.products;
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
  public getTotal(): number {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item, this.pharmacieId);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
