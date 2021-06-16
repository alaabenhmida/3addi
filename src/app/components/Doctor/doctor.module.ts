import {NgModule} from '@angular/core';
import {ProfileDocComponent} from './profile-doc/profile-doc.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {DocDashboardComponent} from './doc-dashboard/doc-dashboard.component';
import {MyPatientsComponent} from './my-patients/my-patients.component';
import {DocProfilSettingComponent} from './doc-profil-setting/doc-profil-setting.component';
import {MapGridComponent} from './map-grid/map-grid.component';
import {AppointementsComponent} from './appointements/appointements.component';
import {BookingSuccessComponent} from '../Patient/booking-success/booking-success.component';
import {CheckoutComponent} from '../Patient/checkout/checkout.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {SearchComponent} from './search/search.component';
import {ManageTimeComponent} from './manage-time/manage-time.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {AlertModule} from 'ngx-bootstrap/alert';
import {DoctorRoutingModule} from '../../routers/doctor-routing/doctor-routing.module';
import {NgxStripeModule} from 'ngx-stripe';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    ProfileDocComponent,
    AppointmentComponent,
    DocDashboardComponent,
    MyPatientsComponent,
    DocProfilSettingComponent,
    MapGridComponent,
    AppointementsComponent,
    BookingSuccessComponent,
    CheckoutComponent,
    ReviewsComponent,
    SearchComponent,
    ManageTimeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOhHjYUOLvSh3GG_H69tQTpYvQlJmT-Rc'
    }),
    AgmDirectionModule,
    AgmSnazzyInfoWindowModule,
    NgxStripeModule.forRoot('pk_test_51Iz3EFKNPi1VJcHg2s4jzJrl8hX5vSi5On4k0w2Z8AICRQcSf0z8mWLr1Utv862jdEVfXdZoD7T9RvpL21IqKqMY000A6GtnWf'),
    AlertModule.forRoot(),
    DoctorRoutingModule,
    NgxSpinnerModule
  ]
})
export class DoctorModule { }
