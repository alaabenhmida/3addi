import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-phar-demandes',
  templateUrl: './phar-demandes.component.html',
  styleUrls: ['./phar-demandes.component.css']
})
export class PharDemandesComponent implements OnInit {
  pharmacies: any;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe(data => {
      this.pharmacies = data[0].pharmacies;
    });
  }

}
