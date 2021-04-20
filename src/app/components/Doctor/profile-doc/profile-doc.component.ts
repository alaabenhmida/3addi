import {Component, OnDestroy, OnInit} from '@angular/core';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MessagesService} from '../../../shared/messages/messages.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import * as moment from 'moment';


@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.css']
})
export class ProfileDocComponent implements OnInit, OnDestroy {
  id: string;
  doctorData: Doctor;
  // rate: number;
  // selectedDate: any;
  rating = 0;
  education: any;
  experience: any;
  awards: any;
  private role: string;
  private userid: string;
  private roleSubs: Subscription;
  private useridSub: Subscription;
  day = moment(Date.now()).toString();

  constructor(public route: ActivatedRoute, public doctorServive: DoctorServiceService,
              private authService: PatientAuthService, private chatService: MessagesService,
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.getDay(this.day, 'ddd'));
    this.role = this.authService.getRole();
    this.roleSubs = this.authService.getRoleListener().subscribe(role => {
      this.role = role;
    });
    this.userid = this.authService.getUserid();
    this.useridSub = this.authService.getuseridListener().subscribe(
      isAuthenticated => {
        this.userid = isAuthenticated;
      }
    );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.doctorServive.getDoctor(this.id).subscribe(data => {
        // console.log(data);
        this.doctorData = {
          id: data._id,
          email: data.email,
          password: data.password,
          imagePath: data.imagePath,
          name: data.name,
          lastName: data.lastName,
          gender: data.gender,
          address: data.address,
          speciality: data.speciality,
          post: data.post,
          birthday: data.birthday,
          price: data.price,
          phone: data.phone,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          country: data.country,
          zip: data.zip,
          reviews: data.reviews,
          rdv: data.rdv
        };
        this.education = data.education;
        this.experience = data.experience;
        this.awards = data.awards;
        for (const rev of this.doctorData.reviews) {
          this.rating += rev.rate;
        }
        console.log(this.rating / data.reviews.length);
      });
    });
    // console.log(this.doctorData);
  }

  onSubmit(loginForm: NgForm): void {
    this.doctorServive.addReview(this.id, loginForm.value.rating, loginForm.value.title, loginForm.value.review);
    // console.log(loginForm.value);
  }

  ngOnDestroy(): void {
    this.roleSubs.unsubscribe();
    this.useridSub.unsubscribe();
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }

  chat(): void {
    let roomName = '';
    if (this.userid < this.doctorData.id) {
        roomName = this.userid.concat(this.doctorData.id);
      } else {
        roomName = this.doctorData.id.concat(this.userid);
    }
    this.chatService.createRoom(this.doctorData.id, this.userid, roomName);
    this.router.navigate(['/messages']);
  }
}
