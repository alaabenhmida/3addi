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
  latitude = 51.673858;
  longitude = 7.815982;

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getAllPharmacies().subscribe(data => {
      this.pharmacieData = data.pharmacies;
    });
  }
  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
  placeMarker($event): void{
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

}
