import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {
  pharmacieData: Pharmacie [];

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getAllPharmacies().subscribe(data => {
      this.pharmacieData = data.pharmacies;
    });
  }

}
