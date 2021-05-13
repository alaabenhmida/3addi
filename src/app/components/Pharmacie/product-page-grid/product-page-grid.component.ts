import { Component, OnInit } from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';

@Component({
  selector: 'app-product-page-grid',
  templateUrl: './product-page-grid.component.html',
  styleUrls: ['./product-page-grid.component.css']
})
export class ProductPageGridComponent implements OnInit {
  pharmacieId: string;
  pharmacie: any;
  products = [
    {
      name: 'dedede',
      price: 55,
      img: 'assets/images/items/1.jpg'
    },
    {
      name: 'dedede',
      price: 55,
      img: 'assets/images/items/1.jpg'
    },
    {
      name: 'dedede',
      price: 55,
      img: 'assets/images/items/1.jpg'
    },
    {
      name: 'dedede',
      price: 55,
      img: 'assets/images/items/1.jpg'
    },
    {
      name: 'dedede',
      price: 55,
      img: 'assets/images/items/1.jpg'
    },
  ];

  constructor(private pharmacieService: PharmacieService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieId = paramMap.get('id');
      this.pharmacieService.getPharmacie(paramMap.get('id')).subscribe(data => {
        this.pharmacie = data;
      }, error => {
        console.log(error);
      });
    });
  }

}
