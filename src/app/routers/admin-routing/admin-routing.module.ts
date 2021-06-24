import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../auth/doctor-auth.gards';
import {PatientAuthGuard} from '../../auth/patient-auth.gards';
import {LoginAuthGuard} from '../../auth/login-auth.gards';
import {AdminDashboardComponent} from '../../components/Admin/admin-dashboard/admin-dashboard.component';
import {DocCheckDetailsComponent} from '../../components/Admin/doc-check-details/doc-check-details.component';
import {DocDemandesComponent} from '../../components/Admin/doc-demandes/doc-demandes.component';
import {PharCheckDetailsComponent} from '../../components/Admin/phar-check-details/phar-check-details.component';
import {PharDemandesComponent} from '../../components/Admin/phar-demandes/phar-demandes.component';
import {ListePatientsComponent} from '../../components/Admin/liste-patients/liste-patients.component';
import {DoctorsListeComponent} from '../../components/Admin/doctors-liste/doctors-liste.component';

const appRoutes: Routes = [
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  {path: 'admin/doctorcheck/:id', component: DocCheckDetailsComponent},
  {path: 'admin/pharmaciecheck/:id', component: PharCheckDetailsComponent},
  {path: 'admin/doctorsdemandes', component: DocDemandesComponent},
  {path: 'admin/patients-list', component: ListePatientsComponent},
  {path: 'admin/doctors-list', component: DoctorsListeComponent},
  {path: 'admin/pharmaciesdemandes', component: PharDemandesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class AdminRoutingModule {
}
