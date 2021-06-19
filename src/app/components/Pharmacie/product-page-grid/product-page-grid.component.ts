import {Component, OnDestroy, OnInit} from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {Product} from '../../../models/Pharmacie/product.model';
import {CartService} from '../../../services/pharmacie/cart.service';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {HeaderService} from '../../../services/header/header.service';

@Component({
  selector: 'app-product-page-grid',
  templateUrl: './product-page-grid.component.html',
  styleUrls: ['./product-page-grid.component.css']
})
export class ProductPageGridComponent implements OnInit, OnDestroy {
  pharmacieId: string;
  pharmacie: any;
  products: CartItem[] = [];
  pharmacieProducts: Product[] = [];

  constructor(private pharmacieService: PharmacieService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.isInPharmacie.next(true);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieId = paramMap.get('id');
      this.headerService.pharmacieId.next(paramMap.get('id'));
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
    this.headerService.productNumber.next(this.cartService.products.length);
  }

  addTocart(product: Product): void {
    this.cartService.addToCart(product, 1, this.pharmacieId);
    this.headerService.productNumber.next(this.cartService.products.length);
  }

  ngOnDestroy(): void {
    this.headerService.isInPharmacie.next(false);
  }
}
