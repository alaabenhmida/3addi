import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {ActivatedRoute, ParamMap, Params, Route, Router} from '@angular/router';
import {CartItem} from '../../../models/Pharmacie/cartItem.model';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Product} from '../../../models/Pharmacie/product.model';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {
  pharmacieData: Pharmacie [];
  latitude = 51.673858;
  longitude = 7.815982;
  ordonnanceMode = false;
  prescID: string;
  patientId: string;
  products: CartItem[] = [];

  constructor(private pharmacieService: PharmacieService,
              private router: Router,
              public route: ActivatedRoute,
              private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.ordID) {
        this.prescID = params.ordID;
        this.patientId = params.patientId;
        this.ordonnanceMode = true;
      }
    });
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

  bye(pharmacieID: string): void {
    this.doctorService.getPrescription(this.patientId, this.prescID).subscribe(data => {
        const promiseArray = data.prescription[0].presc.map(product => {
          this.pharmacieService.getProductByName(pharmacieID, product.name).subscribe(products => {
            let prod: Product;
            prod = products;
            this.products.push({product: prod, quantity: product.quantite});
          });
        }) ;
        Promise.all(promiseArray).then(result => {
          this.pharmacieService.byewithPresc(this.products, pharmacieID).subscribe(results => {
            this.router.navigate(['pharmacie', pharmacieID, 'cart']);
          });
        });

    });

  }
}
