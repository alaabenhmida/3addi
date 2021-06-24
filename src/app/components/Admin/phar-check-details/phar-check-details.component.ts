import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';

@Component({
  selector: 'app-phar-check-details',
  templateUrl: './phar-check-details.component.html',
  styleUrls: ['./phar-check-details.component.css']
})
export class PharCheckDetailsComponent implements OnInit {
  pharmacieData: any;

  constructor(public route: ActivatedRoute,
              private adminService: AdminService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.adminService.getPharmacie(paramMap.get('id')).subscribe(data => {
        this.pharmacieData = data.pharmacies[0];
      });
    });
  }

  onAccept(id: string): void {
    this.adminService.signupPharmacie(this.pharmacieData.email, this.pharmacieData.password, this.pharmacieData.imagePath,
      this.pharmacieData.name, this.pharmacieData.address, this.pharmacieData.speciality, this.pharmacieData.phone, this.pharmacieData.city,
      this.pharmacieData.state, this.pharmacieData.country, this.pharmacieData.zip, this.pharmacieData.location.latitude,
      this.pharmacieData.location.longitude).subscribe(data => {
      this.adminService.delPharmacie(id).subscribe(dataa => {
        this.adminService.sendmail(this.pharmacieData.email, 'votre compte a etait approuver',
          'votre compte a etait approuver').subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/admin/pharmaciesdemandes']);
      });
    });
  }

  onReject(id: string): void {
    this.adminService.delPharmacie(id).subscribe(data => {
      this.adminService.sendmail(this.pharmacieData.email, 'votre compte a était refusé',
        'votre compte a était refusé').subscribe(dataa => {
        console.log(data);
      });
      this.router.navigate(['/admin/pharmaciesdemandes']);
    });
  }
}
