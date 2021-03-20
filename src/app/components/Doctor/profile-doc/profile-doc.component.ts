import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.css']
})
export class ProfileDocComponent implements OnInit {
  id: string;
  doctorData: Doctor;

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
          rates: data.rates
        };
      });
    });
    console.log(this.doctorData);
  }

}
