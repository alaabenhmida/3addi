import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-med-record',
  templateUrl: './med-record.component.html',
  styleUrls: ['./med-record.component.css']
})
export class MedRecordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string;
  user: any;


  constructor(public route: ActivatedRoute,
              public patient: DoctorServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(paramMap.get('id'));
    });
    this.form = new FormGroup({
      date: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      file: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit(): void {
    this.patient.addrecord(this.id, this.form.value.date.toString(), this.form.value.description, this.form.value.file);
  }

  ngOnDestroy(): void {
  }
}
