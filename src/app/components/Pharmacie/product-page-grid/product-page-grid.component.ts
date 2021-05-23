import { Component, OnInit } from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {Product} from '../../../models/Pharmacie/product.model';
import {CartService} from '../../../services/pharmacie/cart.service';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';

@Component({
  selector: 'app-product-page-grid',
  templateUrl: './product-page-grid.component.html',
  styleUrls: ['./product-page-grid.component.css']
})
export class ProductPageGridComponent implements OnInit {
  pharmacieId: string;
  pharmacie: any;
  products: CartItem[] = [];
  pharmacieProducts: Product[] = [];

  constructor(private pharmacieService: PharmacieService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieId = paramMap.get('id');
      this.cartService.getcart(paramMap.get('id'));
      this.products = this.cartService.products;
      this.pharmacieService.getPharmacie(paramMap.get('id')).subscribe(data => {
        this.pharmacie = data;
        for (let product of data.products) {
          this.pharmacieProducts.push({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            stock: product.stock
          });
        }
        this.products = this.cartService.products;
      }, error => {
        console.log(error);
      });
    });
  }

  addTocart(product: Product): void {
    this.cartService.addToCart(product, 1, this.pharmacieId);
  }
}
