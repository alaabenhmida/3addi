import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.css']
})
export class ProfileDocComponent implements OnInit {
  id: string;
  doctorData: Doctor;
  // rate: number;
  // selectedDate: any;
  rating = 0;

  constructor(public route: ActivatedRoute, public doctorServive: DoctorServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.doctorServive.getDoctor(this.id).subscribe(data => {
        // console.log(data);
        this.doctorData = {
          id: data._id,
          email: data.email,
          password: data.password,
          imagePath: data.imagePath,
          name: data.name,
          address: data.address,
          speciality: data.speciality,
          post: data.post,
          birthday: data.birthday,
          price: data.price,
          phone: data.phone,
          reviews: data.reviews,
          rdv: data.rdv
        };
        for (const rev of this.doctorData.reviews) {
          this.rating += rev.rate;
        }
        console.log(this.rating / data.reviews.length);
      });
    });
    // console.log(this.doctorData);
  }

  onSubmit(loginForm: NgForm): void {
    this.doctorServive.addReview(this.id, loginForm.value.rating, loginForm.value.title, loginForm.value.review);
    // console.log(loginForm.value);
  }
}
