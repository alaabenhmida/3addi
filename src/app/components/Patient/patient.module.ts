import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {MedRecordComponent} from './med-record/med-record.component';
import {AddPrescComponent} from './add-presc/add-presc.component';
import {ProfileSettComponent} from './profile-sett/profile-sett.component';
import {FavDocsComponent} from './fav-docs/fav-docs.component';
import {PatientDhashboardComponent} from './patient-dhashboard/patient-dhashboard.component';
import {PrescriptionDetailsComponent} from './prescription-details/prescription-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ProfileComponent,
    MedRecordComponent,
    AddPrescComponent,
    ProfileSettComponent,
    FavDocsComponent,
    PatientDhashboardComponent,
    PrescriptionDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ]
})
export class PatientModule { }
