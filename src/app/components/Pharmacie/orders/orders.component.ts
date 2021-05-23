import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {Subscription} from 'rxjs';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pharmacieData: Pharmacie;
  pharmacieSub: Subscription;
  orders = [];

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getDataByKey().subscribe(data => {
      data.orders.forEach(order => {
        let total = 0;
        order.products.forEach(product => {
          total += product.product.price * product.quantity;
        });
        this.orders.push({order, total});
      });
      this.pharmacieData = data;
      // this.orders = data.orders;
    });
    this.pharmacieSub = this.pharmacieService.getDatalistener().subscribe(data => {
      this.pharmacieData = data;
      // this.orders = data.orders;
    });
    console.log(this.orders);
  }
  getDate(day: string, format: string): string {
    return moment(day).locale('fr').format(format);
  }
}
