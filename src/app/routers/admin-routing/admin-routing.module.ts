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
import {AdminAuthGard} from '../../auth/admin-auth.gards';

const appRoutes: Routes = [
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/doctorcheck/:id', component: DocCheckDetailsComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/pharmaciecheck/:id', component: PharCheckDetailsComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/doctorsdemandes', component: DocDemandesComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/patients-list', component: ListePatientsComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/doctors-list', component: DoctorsListeComponent, canActivate: [AdminAuthGard]},
  {path: 'admin/pharmaciesdemandes', component: PharDemandesComponent, canActivate: [AdminAuthGard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AdminAuthGard]
})
export class AdminRoutingModule {
}
