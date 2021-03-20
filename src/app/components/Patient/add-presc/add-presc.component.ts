import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {Subscription} from 'rxjs';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-add-presc',
  templateUrl: './add-presc.component.html',
  styleUrls: ['./add-presc.component.css']
})
export class AddPrescComponent implements OnInit, OnDestroy {
  form: FormGroup;
  userid;
  userIdSub: Subscription;
  doctorob: any;

  constructor(private fb: FormBuilder, private doctor: DoctorAuthService, private doctorSevive: DoctorServiceService) {
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

  ngOnInit(): void {
    this.doctor.autoAuthUser();
    this.userid = this.doctor.getUserid();
    this.userIdSub = this.doctor.getuseridListener().subscribe(id => {
      this.userid = id;
    });
    this.doctorSevive.getDoctor(this.userid).subscribe(doc => {
      console.log(doc);
    });

    // console.log(this.doctorob);
  }
  addCreds(): void {
    const creds = this.form.controls.Prescription as FormArray;
    creds.push(this.fb.group({
      name: new FormControl(null, { validators: [Validators.required] }),
      quantite: new FormControl(null, { validators: [Validators.required] }),
      days: new FormControl(null, { validators: [Validators.required] }),
      mor: new FormControl(null),
      af: new FormControl(null),
      ev: new FormControl(null),
      nght: new FormControl(null)
    }));
  }

  deleteCreds(index): void{
    const creds = this.form.controls.Prescription as FormArray;
    creds.removeAt(index);
  }
  onSubmit(): void{
    if (this.form.invalid){
      return;
    }
    console.log(this.form.value.Prescription);
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe();
  }

}
