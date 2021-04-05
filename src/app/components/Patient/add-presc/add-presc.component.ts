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
  private mode = 'create';
  prescId: string;
  prescData: any;


  constructor(public route: ActivatedRoute,
              private fb: FormBuilder,
              private doctor: DoctorAuthService,
              private doctorSevive: DoctorServiceService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Prescription: this.fb.array([])
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('prescID')) {
        this.mode = 'edit';
        this.prescId = paramMap.get('prescID');
        console.log(paramMap.get('id'));
        this.patientId = paramMap.get('id');
        this.doctorSevive.getPrescription(paramMap.get('id'), this.prescId).subscribe(data => {
          this.prescData = data;
          console.log(data.prescription[0].presc);
          const creds = this.form.controls.Prescription as FormArray;
          for (const pres of data.prescription[0].presc) {
            creds.push(this.fb.group({
              name: new FormControl(pres.name, { validators: [Validators.required] }),
              quantite: new FormControl(pres.quantite, { validators: [Validators.required] }),
              days: new FormControl(pres.days, { validators: [Validators.required] }),
              mor: new FormControl(pres.mor),
              af: new FormControl(pres.af),
              ev: new FormControl(pres.ev),
              nght: new FormControl(pres.nght)
            }));
          }
        });
      } else {
        this.mode = 'create';
        this.patientId = paramMap.get('id');
        this.addCreds();

      }

    });

  }
  addCreds(): void {
    const creds = this.form.controls.Prescription as FormArray;
    // for (let i = 0; i < 2; i++) {
    creds.push(this.fb.group({
        name: new FormControl(null, { validators: [Validators.required] }),
        quantite: new FormControl(null, { validators: [Validators.required] }),
        days: new FormControl(null, { validators: [Validators.required] }),
        mor: new FormControl(false),
        af: new FormControl(false),
        ev: new FormControl(false),
        nght: new FormControl(false)
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
    if (this.mode === 'create') {
      this.doctorSevive.addPrescription(this.form.value.Prescription, this.patientId);
      // console.log(this.form.value.Prescription);
    } else {
      this.doctorSevive.updatePrescription(this.patientId, this.prescId,
        this.form.value.Prescription);
    }
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe();
  }

}
