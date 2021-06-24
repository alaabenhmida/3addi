import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {MedRecordComponent} from './med-record/med-record.component';
import {AddPrescComponent} from './add-presc/add-presc.component';
import {ProfileSettComponent} from './profile-sett/profile-sett.component';
import {FavDocsComponent} from './fav-docs/fav-docs.component';
import {PatientDhashboardComponent} from './patient-dhashboard/patient-dhashboard.component';
import {PrescriptionDetailsComponent} from './prescription-details/prescription-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AddCertificatComponent} from './add-certificat/add-certificat.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {CertificatDetailsComponent} from './certificat-details/certificat-details.component';
import {InvoicePharDetailComponent} from './invoice-phar-detail/invoice-phar-detail.component';
import {ChangePasswordComponent} from './change-password/change-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MedRecordComponent,
    AddPrescComponent,
    ProfileSettComponent,
    FavDocsComponent,
    PatientDhashboardComponent,
    PrescriptionDetailsComponent,
    AddCertificatComponent,
    CertificatDetailsComponent,
    InvoicePharDetailComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    AngularMaterialModule,
    TypeaheadModule.forRoot()
  ]
})
export class PatientModule {
}
