import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Doctor} from '../../models/Doctor/doctor.model';
import {DoctorServiceService} from '../../services/doctor/doctor-service.service';
import {PatientServiceService} from '../../services/Patient/patient-service.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  form: FormGroup;
  doctorsData: Doctor[];
  private isloggedIn = false;
  private isloggedInSub: Subscription;
  private today = moment(new Date()).toString();
  Cardiologist = 0;
  Cardiologue = 0;
  Orthopedique = 0;
  Dentiste = 0;
  Neurologie = 0;
  Urologie = 0;

  constructor(private doctorService: DoctorServiceService,
              private patientService: PatientServiceService,
              private authService: PatientAuthService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.doctorService.getspecialityCount('Cardiologist').subscribe(data => {
      this.Cardiologue = data;
    });
    this.doctorService.getspecialityCount('Cardiologue').subscribe(data => {
      this.Cardiologue = data;
    });
    this.doctorService.getspecialityCount('Orthopédique').subscribe(data => {
      this.Orthopedique = data;
    });
    this.doctorService.getspecialityCount('Dentiste').subscribe(data => {
      this.Dentiste = data;
    });
    this.doctorService.getspecialityCount('Neurologie').subscribe(data => {
      this.Neurologie = data;
    });
    this.doctorService.getspecialityCount('Urologie').subscribe(data => {
      this.Urologie = data;
    });
    this.isloggedIn = this.authService.getIsAuth();
    this.isloggedInSub = this.authService.getAuthStatusListener().subscribe(
      auth => {
        this.isloggedIn = auth;
      }
    );
    this.doctorService.getAllDoctors(5, 1).subscribe(result => {
      this.doctorsData = result.doctors;
    });
    this.form = new FormGroup({
      speciality: new FormControl(null),
      sexe: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null),
      name: new FormControl(null)
    });
  }

  onAddFavDoc(doctorId: string): void {
    this.patientService.addFavourite(doctorId).subscribe(result => {
      console.log(result);
      this.toastr.success('ajouter aux favoris', '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  ngOnDestroy(): void {
    this.isloggedInSub.unsubscribe();
  }

  onSearch(): void {
    if (this.form.invalid) {
      this.toastr.error('champs requis', '', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }
    this.router.navigate(['doctor/search'], {queryParams: {
      city: this.form.value.city,
      speciality: this.form.value.speciality,
      sexe: this.form.value.sexe}});
  }
}
