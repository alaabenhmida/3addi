import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews = [];

  constructor(private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctorService.getDcotorByKey().subscribe(data => {
      this.reviews = data.reviews;
    });
  }

}
