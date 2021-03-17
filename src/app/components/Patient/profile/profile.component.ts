import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/Patient/patient.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  patientdata: Patient;
  medicalRecord: string[];

  constructor(public route: ActivatedRoute, public patient: PatientServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.patient.getPatient(this.id).subscribe(data => {
        if (data) {
          this.patientdata = {
            id : data._id,
            email : data.email,
            password : data.password,
            imagePath : data.imagePath,
            name : data.name,
            address : data.address,
            birthday : data.birthday,
            bloodType : data.bloodType,
            phone : data.phone
          };
          this.medicalRecord = data.medicalRecord;
          console.log(this.medicalRecord);

        } else {
          console.log('not found!!');
        }
      });
    });
  }

}
