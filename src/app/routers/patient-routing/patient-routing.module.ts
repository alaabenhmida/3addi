import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../../shared/index/index.component';
import {LoginComponent} from '../../components/Patient/login/login.component';
import {SignupComponent} from '../../components/Patient/signup/signup.component';
import {ProfileComponent} from '../../components/Patient/profile/profile.component';
import {MedRecordComponent} from '../../components/Patient/med-record/med-record.component';
import {AddPrescComponent} from '../../components/Patient/add-presc/add-presc.component';


const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'patient/:id', component: ProfileComponent },
  { path: 'patient/:id/addrecord', component: MedRecordComponent },
  { path: 'patient/:id/addpresc', component: AddPrescComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
