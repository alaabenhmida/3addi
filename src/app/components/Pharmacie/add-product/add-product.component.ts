import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  pharmacieData: Pharmacie;
  form: FormGroup;

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit(): void {
    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
    });
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      stock: new FormControl(null, { validators: [Validators.required] }),
      descriptions: new FormControl(null, { validators: [Validators.required] }),
    });
  }

}
