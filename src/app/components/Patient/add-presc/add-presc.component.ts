import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {Subscription} from 'rxjs';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-add-presc',
  templateUrl: './add-presc.component.html',
  styleUrls: ['./add-presc.component.css']
})
export class AddPrescComponent implements OnInit, OnDestroy {
  form: FormGroup;
  patientId: string;
  userIdSub: Subscription;
  doctorob: any;


  constructor(public route: ActivatedRoute,
              private fb: FormBuilder,
              private doctor: DoctorAuthService,
              private doctorSevive: DoctorServiceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientId = paramMap.get('id');
    });
    this.form = this.fb.group({
      Prescription: this.fb.array([
        new FormGroup({
          name: new FormControl(null, { validators: [Validators.required] }),
          quantite: new FormControl(null, { validators: [Validators.required] }),
          days: new FormControl(null, { validators: [Validators.required] }),
          mor: new FormControl(null),
          af: new FormControl(null),
          ev: new FormControl(null),
          nght: new FormControl(null),
        })
      ])
    });
  }
  addCreds(): void {
    const creds = this.form.controls.Prescription as FormArray;
    // for (let i = 0; i < 2; i++) {
    creds.push(this.fb.group({
        name: new FormControl(null, { validators: [Validators.required] }),
        quantite: new FormControl(null, { validators: [Validators.required] }),
        days: new FormControl(null, { validators: [Validators.required] }),
        mor: new FormControl(null),
        af: new FormControl(null),
        ev: new FormControl(null),
        nght: new FormControl(null)
      }));
    // }
}

  deleteCreds(index): void{
    const creds = this.form.controls.Prescription as FormArray;
    creds.removeAt(index);
  }
  onSubmit(): void{
    if (this.form.invalid){
      return;
    }
    this.doctorSevive.addPrescription(this.form.value.Prescription, this.patientId);
    // console.log(this.form.value.Prescription);
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe();
  }

}
