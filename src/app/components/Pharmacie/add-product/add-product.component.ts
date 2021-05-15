import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../shared/mime-type.validator';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  pharmacieData: Pharmacie;
  form: FormGroup;
  imagePreview: string;
  mode = 'create';
  productID: string;

  constructor(private pharmacieService: PharmacieService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)] }),
      stock: new FormControl(null, { validators: [Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.productID = paramMap.get('id');
        this.pharmacieService.getProductbyid(paramMap.get('id')).subscribe(result => {
          this.form.patchValue({
            name: result.products[0].name,
            price: result.products[0].price,
            stock: result.products[0].stock,
            description: result.products[0].description
          });
          this.imagePreview = result.products[0].image;
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    if (this.mode === 'create') {
      this.pharmacieService.addProduct(this.form.value.name, this.form.value.description,
        this.form.value.price, this.form.value.image, this.form.value.stock).subscribe(result => {
        this.form.reset();
        this.imagePreview = '';
        console.log(result);
      });
    } else {
      this.pharmacieService.updateProduct(this.productID, this.form.value.name,
        this.form.value.description, this.form.value.price,
        this.form.value.stock, this.form.value.image).subscribe(result => {
         console.log(this.form.value.image);
      });
    }
  }
}
