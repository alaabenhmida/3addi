import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Doctor} from '../../../models/Doctor/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  filtergroupe: FormGroup;
  doctors: Doctor[];
  genders: string[] = [];
  constructor(private doctor: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctor.getAllDoctors(3, 1).subscribe(data => {
      this.doctors = data.doctors;
    });
    this.filtergroupe = new FormGroup({
      filter: new FormControl('Select')
    });
    this.form = new FormGroup({
      name: new FormControl(null),
      male: new FormControl(false),
      female: new FormControl(false),
    });
  }
  onSubmit(): void{
    // console.log(this.filtergroupe.value.filter);
    if (this.genders.length === 0) {
      this.doctor.search(this.form.value.name, ['Male', 'Female']).subscribe(data => {
        this.doctors = data;
      });
    } else {
      this.doctor.search(this.form.value.name, this.genders).subscribe(data => {
        this.doctors = data;
      });
    }
  }

  onChange(gender: string, target: any): void {
    if (target.checked) {
      if (this.genders.indexOf(gender) === -1) {
        this.genders.push(gender);
      }
    } else {
      this.genders.splice(gender.indexOf(gender), 1);
    }
  }

  onFilter(target: any): void {
    this.doctors.sort((a, b) => (a.price > b.price) ? 1 : ((a.price > b.price) ? -1 : 0));
  }
}
