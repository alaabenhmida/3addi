import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  speciality: string [] = [];

  constructor(private doctor: DoctorServiceService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.city) {
        console.log(params);
        // this.speciality.push(params.speciality);
        this.doctor.search(params.city, params.sexe, [params.speciality]).subscribe(data => {
          this.doctors = data;
        });
      }
    });
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
      Urologie: new FormControl(false),
      Neurologie: new FormControl(false),
      Dentiste: new FormControl(false),
      Orthopedique: new FormControl(false),
      Cardiologue: new FormControl(false)
    });
  }

  onSubmit(): void {
    console.log(this.speciality);
    // console.log(this.filtergroupe.value.filter);
    if (this.genders.length === 0) {
      this.doctor.search(this.form.value.name, ['Male', 'Female'],
        ['Urologie', 'Neurologie', 'Dentiste', 'Orthopédique', 'Cardiologue', 'Generale']).subscribe(data => {
        this.doctors = data;
      });
    } else {
      this.doctor.search(this.form.value.name, this.genders, this.speciality).subscribe(data => {
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

  onChangespec(speciality: string, target: any): void {
    if (target.checked) {
      if (this.speciality.indexOf(speciality) === -1) {
        this.speciality.push(speciality);
      }
    } else {
      this.speciality.splice(speciality.indexOf(speciality), 1);
    }
  }

  onFilter(target: any): void {
    this.doctors.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
  }
}
