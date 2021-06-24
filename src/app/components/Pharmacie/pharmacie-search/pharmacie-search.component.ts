import {Component, OnInit} from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-pharmacie-search',
  templateUrl: './pharmacie-search.component.html',
  styleUrls: ['./pharmacie-search.component.css']
})
export class PharmacieSearchComponent implements OnInit {
  pharmacieData: Pharmacie[];
  form: FormGroup;

  constructor(private pharmacieService: PharmacieService) {
  }

  ngOnInit(): void {
    this.pharmacieService.getAllPharmacies().subscribe(data => {
      this.pharmacieData = data.pharmacies;
    });
    this.form = new FormGroup({
      city: new FormControl(null),
      category: new FormControl(false)
    });
  }

  onSearch(): void {
    this.pharmacieService.search(this.form.value.city).subscribe(data => {
      this.pharmacieData = data;
    });
  }
}
