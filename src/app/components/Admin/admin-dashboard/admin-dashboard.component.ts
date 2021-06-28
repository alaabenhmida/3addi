import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  saleData = [
    {name: 'Mobiles', value: 105000},
    {name: 'Laptop', value: 55000},
    {name: 'AC', value: 15000},
    {name: 'Headset', value: 150000},
    {name: 'Fridge', value: 20000}
  ];
  doctorCount = 0;
  patientCount = 0;
  pharmacieCount = 0;
  revenue = 0;
  specialityData = [];

  constructor(private doctorService: DoctorServiceService,
              private patientService: PatientServiceService,
              private pharmacieService: PharmacieService,
              private auth: PatientAuthService) {
  }

  ngOnInit(): void {
    this.doctorService.getspecialityCount('Dentiste').subscribe(result1 => {
      // console.log(1);
      this.doctorService.getspecialityCount('Urologie').subscribe(result2 => {
        // console.log(2);
        this.doctorService.getspecialityCount('Neurologie').subscribe(result3 => {
          // console.log(3);
          this.doctorService.getspecialityCount('Orthopédique').subscribe(result4 => {
            // console.log(4);
            this.doctorService.getspecialityCount('Cardiologue').subscribe(result5 => {
              // console.log(5);
              this.doctorService.getspecialityCount('Generale').subscribe(result6 => {
                // this.doctorService.specialityUpdate.next({name: 'Generale', value: result});
                this.specialityData = [
                  {name: 'Dentiste', value: result1},
                  {name: 'Urologie', value: result2},
                  {name: 'Neurologie', value: result3},
                  {name: 'Orthopédique', value: result4},
                  {name: 'Cardiologue', value: result5},
                  {name: 'Generale', value: result6}
                ];
                // console.log(6);
              });
            });
          });
        });
      });
    });

    this.doctorService.getAllDoctors().subscribe(doctors => {
      doctors.doctors.forEach(doctor => {
        this.revenue += doctor.price * doctor.rdv.length;
      });
      this.doctorCount = doctors.maxDoctors;
    });
    this.patientService.getAllPAtient().subscribe(patient => {
      this.patientCount = patient.maxPatient;
    });
    this.pharmacieService.getAllPharmacies().subscribe(pharmacies => {
      this.pharmacieCount = pharmacies.maxPharmacies;
      pharmacies.pharmacies.forEach(pharmacie => {
        let saless = 0;
        pharmacie.sales.forEach(sale => {
          saless += sale.price * sale.quantity;
        });
        this.revenue += saless;
      });
    });
  }

  onLougout(): void {
    this.auth.logout();
  }
}
