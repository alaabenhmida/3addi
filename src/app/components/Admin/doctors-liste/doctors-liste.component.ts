import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-doctors-liste',
  templateUrl: './doctors-liste.component.html',
  styleUrls: ['./doctors-liste.component.css']
})
export class DoctorsListeComponent implements OnInit {
  doctors: any;

  constructor(private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(doctors => {
      this.doctors = doctors.doctors;
    });
  }
  onDelete(id: string): void {
    this.doctorService.deleteDoctor(id).subscribe(data => {
      this.doctorService.getAllDoctors().subscribe(doctors => {
        this.doctors = doctors.doctors;
      });
    });
  }
}
