import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import * as moment from 'moment';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderID: string;
  pharmacieData: Pharmacie;
  order: any;
  total = 0;

  constructor(private route: ActivatedRoute,
              private pharmacieService: PharmacieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieService.getDataByKey().subscribe(data => {
        this.pharmacieData = data;
      });
      this.orderID = paramMap.get('id');
      this.pharmacieService.getOrder(paramMap.get('id')).subscribe(data => {
        this.order = data.orders[0];
        data.orders[0].products.forEach(product => {
          this.total += product.product.price * product.quantity;
        });
      });
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
}
