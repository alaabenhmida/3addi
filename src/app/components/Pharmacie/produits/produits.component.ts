import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit, OnDestroy {
  pharmacieData: Pharmacie;
  pharmacieSub: Subscription;

  constructor(private pharmacieService: PharmacieService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
    });
    this.pharmacieSub = this.pharmacieService.getDatalistener().subscribe(data => {
      this.pharmacieData = data;
    });
  }

  onDelete(id: string): void {
    this.pharmacieService.deleteProduct(id).subscribe(data => {
      this.pharmacieService.dataUpdated.next(data);
      this.toastr.success('produit supprimé', '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }

  ngOnDestroy(): void {
    this.pharmacieSub.unsubscribe();
  }
}
