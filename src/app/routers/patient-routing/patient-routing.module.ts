import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../../shared/index/index.component';
import {LoginComponent} from '../../components/Patient/login/login.component';
import {SignupComponent} from '../../components/Patient/signup/signup.component';
import {ProfileComponent} from '../../components/Patient/profile/profile.component';
import {MedRecordComponent} from '../../components/Patient/med-record/med-record.component';
import {AddPrescComponent} from '../../components/Patient/add-presc/add-presc.component';
import {MessagesComponent} from '../../shared/messages/messages.component';
import {ProfileSettComponent} from '../../components/Patient/profile-sett/profile-sett.component';
import {FavDocsComponent} from '../../components/Patient/fav-docs/fav-docs.component';
import {BookingSuccessComponent} from '../../components/Patient/booking-success/booking-success.component';
import {InvoiceDetailComponent} from '../../components/Patient/invoice-detail/invoice-detail.component';


const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/setting', component: ProfileSettComponent },
  { path: 'profile/favdocs', component: FavDocsComponent },
  { path: 'facture/:rdvid', component: InvoiceDetailComponent },
  { path: 'ordre/:rdvid', component: BookingSuccessComponent },
  { path: 'patient/:id', component: ProfileComponent },
  { path: 'patient/:id/addrecord', component: MedRecordComponent },
  { path: 'patient/:id/addpresc', component: AddPrescComponent },
  { path: 'patient/:id/presc/:prescID', component: AddPrescComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
