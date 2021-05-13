import { Component, OnInit } from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Product} from '../../../models/Pharmacie/product.model';
import {CartService} from '../../../services/pharmacie/cart.service';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: string;
  pharmacieId: string;
  products: CartItem[] = [];

  constructor(private pharmacieService: PharmacieService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.cartService.getcart(paramMap.get('id'));
      this.products = this.cartService.products;
      this.pharmacieId = paramMap.get('id');
      this.productId = paramMap.get('prodId');
      this.pharmacieService.getProduct(paramMap.get('id'), paramMap.get('prodId')).subscribe(result => {
        this.product = {
          id: result.products[0]._id,
          name: result.products[0].name,
          description: result.products[0].description,
          price: result.products[0].price,
          image: result.products[0].image,
          stock: result.products[0].stock
        };
      });
    });
  }
  addTocart(): void {
    this.cartService.addToCart(this.product, 1, this.pharmacieId);
  }

}
