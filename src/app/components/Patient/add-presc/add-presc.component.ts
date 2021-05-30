import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {Subscription} from 'rxjs';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import * as moment from 'moment';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-presc',
  templateUrl: './add-presc.component.html',
  styleUrls: ['./add-presc.component.css']
})
export class AddPrescComponent implements OnInit, OnDestroy {
  form: FormGroup;
  patientData: any;
  patientId: string;
  userIdSub: Subscription;
  doctorData: Doctor;
  mode = 'create';
  prescId: string;
  prescData: any;
  today = moment(new Date()).toString();


  constructor(public route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private doctor: DoctorAuthService,
              private doctorSevive: DoctorServiceService,
              private patientService: PatientServiceService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Prescription: this.fb.array([])
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getPatient(paramMap.get('id')).subscribe(patient => {
        this.patientData = patient;
      });
      if (paramMap.has('prescID')) {
        this.mode = 'edit';
        this.prescId = paramMap.get('prescID');
        this.patientId = paramMap.get('id');
        this.doctorSevive.getPrescription(paramMap.get('id'), this.prescId).subscribe(data => {
          this.prescData = data.prescription[0];
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
        this.doctorSevive.getDcotorByKey().subscribe(doctor => {
          this.doctorData = doctor;
        });
        this.mode = 'create';
        this.patientId = paramMap.get('id');
        this.addCreds();

      }

    });

  }
  get controls(): any { // a getter!
    return (this.form.get('Prescription') as FormArray).controls;
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
      console.log(this.form.controls.Prescription.get('name'));
      return;
    }
    if (this.mode === 'create') {
      this.doctorSevive.addPrescription(this.form.value.Prescription, this.patientId)
        .subscribe(data => {
          this.toastr.success('Ordonnance ajoutée', '', {
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/patient', this.patientData._id]);
        });
      // console.log(this.form.value.Prescription);
    } else {
      this.doctorSevive.updatePrescription(this.patientId, this.prescId,
        this.form.value.Prescription)
        .subscribe(result => {
          this.toastr.success('Ordonnance enregistrée', '', {
            positionClass: 'toast-bottom-right'
          });
        });;
    }
  }
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }

  clearForm(): void {
    this.form.reset();
  }

  ngOnDestroy(): void {
  }

}
