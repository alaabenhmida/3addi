import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';

@Component({
  selector: 'app-doc-check-details',
  templateUrl: './doc-check-details.component.html',
  styleUrls: ['./doc-check-details.component.css']
})
export class DocCheckDetailsComponent implements OnInit {
  doctorData: any;

  constructor(public route: ActivatedRoute,
              private adminService: AdminService,
              private doctorauth: DoctorAuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.adminService.getDoctor(paramMap.get('id')).subscribe(data => {
        this.doctorData = data.doctors[0];
      });
    });
  }

  onAccept(id: string): void {
    this.doctorauth.signup(this.doctorData.email, this.doctorData.password, this.doctorData.imagePath,
      this.doctorData.name, this.doctorData.lastName, this.doctorData.address, this.doctorData.speciality, this.doctorData.birthday,
      this.doctorData.price, this.doctorData.phone, this.doctorData.gender, this.doctorData.city,
      this.doctorData.state, this.doctorData.country, this.doctorData.zip, this.doctorData.location.latitude,
      this.doctorData.location.longitude).subscribe(() => {
      this.adminService.delDoctor(id).subscribe(dataa => {
        this.adminService.sendmail(this.doctorData.email, 'votre compte a etait approuver',
          'votre compte a etait approuver').subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/admin/doctorsdemandes']);
      });
    });
  }

  onReject(id: string): void {
    this.adminService.delDoctor(id).subscribe(data => {
      this.adminService.sendmail(this.doctorData.email, 'votre compte a était refusé',
        'votre compte a était refusé').subscribe(dataa => {
        console.log(data);
      });
      this.router.navigate(['/admin/doctorsdemandes']);
    });
  }
}
