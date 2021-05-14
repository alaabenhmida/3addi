import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';

@Component({
  selector: 'app-phar-dashboard',
  templateUrl: './phar-dashboard.component.html',
  styleUrls: ['./phar-dashboard.component.css']
})
export class PharDashboardComponent implements OnInit {
  pharmacieData: Pharmacie;

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
    });
  }

}
