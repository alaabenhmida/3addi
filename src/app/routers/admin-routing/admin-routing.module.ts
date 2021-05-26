import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../auth/doctor-auth.gards';
import {PatientAuthGuard} from '../../auth/patient-auth.gards';
import {LoginAuthGuard} from '../../auth/login-auth.gards';
import {AdminDashboardComponent} from '../../components/Admin/admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [
  { path: 'admin/dashboard', component: AdminDashboardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class AdminRoutingModule { }
