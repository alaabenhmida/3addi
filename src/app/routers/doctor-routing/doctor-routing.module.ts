import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupDrComponent} from '../../components/Doctor/signup-dr/signup-dr.component';
import {LogindrComponent} from '../../components/Doctor/logindr/logindr.component';

const appRoutes: Routes = [
  { path: 'doctor/signup', component: SignupDrComponent },
  { path: 'doctor/login', component: LogindrComponent }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
