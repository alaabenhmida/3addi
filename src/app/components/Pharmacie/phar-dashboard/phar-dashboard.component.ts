import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import * as moment from 'moment';

@Component({
  selector: 'app-phar-dashboard',
  templateUrl: './phar-dashboard.component.html',
  styleUrls: ['./phar-dashboard.component.css']
})
export class PharDashboardComponent implements OnInit {
  pharmacieData: Pharmacie;
  sales: any;
  todaySales = [];
  today = new Date();
  todaySalesAmount = 0;
  todaySAlesQuantite = 0;
  totalSalesAMount = 0;

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
      this.sales = data.sales;
      data.sales.forEach(sale => {
        this.totalSalesAMount += sale.price;
        if (moment(sale.date).format('DD MM') === moment(this.today).format('DD MM')) {
          // console.log(sale);
          this.todaySales.push(sale);
          this.todaySalesAmount += sale.price;
          this.todaySAlesQuantite += sale.quantity;
        }
      });
    });
  }

  getDate(day: string, format: string): string {
    return moment(day).locale('fr').format(format);
  }

}
