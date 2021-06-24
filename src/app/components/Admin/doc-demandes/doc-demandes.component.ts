import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-doc-demandes',
  templateUrl: './doc-demandes.component.html',
  styleUrls: ['./doc-demandes.component.css']
})
export class DocDemandesComponent implements OnInit {
  doctors: any = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe(data => {
      this.doctors = data[0].doctors;
    });
  }

}
