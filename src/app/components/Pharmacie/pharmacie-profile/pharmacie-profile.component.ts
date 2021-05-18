import {Component, OnDestroy, OnInit} from '@angular/core';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pharmacie-profile',
  templateUrl: './pharmacie-profile.component.html',
  styleUrls: ['./pharmacie-profile.component.css']
})
export class PharmacieProfileComponent implements OnInit, OnDestroy {
  pharmacieData: Pharmacie;
  pharmacieID: string;
  isauth: boolean;
  isauthSub: Subscription;
  dataSub: Subscription;
  rating: number;
  rate: number;

  constructor(private pharmacieService: PharmacieService,
              private route: ActivatedRoute,
              private authService: PatientAuthService,
              private toastr: ToastrService,
              public router: Router) { }

  ngOnInit(): void {
    this.dataSub = this.pharmacieService.getDatalistener().subscribe(data => {
      this.pharmacieData = {
        id: data._id,
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.state,
        zip: data.zip,
        imagePath: data.imagePath,
        type: data.type,
        phone: data.phone,
        aboutMe: data.aboutMe,
        products: data.products,
        reviews: data.reviews,
        awards: data.awards
      };
    });
    this.isauth = this.authService.getIsAuth();
    this.isauthSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isauth = auth;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pharmacieID = paramMap.get('id');
      this.pharmacieService.getPharmacie(paramMap.get('id')).subscribe(data => {
        this.pharmacieData = {
          id: data._id,
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.state,
          zip: data.zip,
          imagePath: data.imagePath,
          type: data.type,
          phone: data.phone,
          aboutMe: data.aboutMe,
          products: data.products,
          reviews: data.reviews,
          awards: data.awards
        };
        for (const rev of data.reviews) {
          this.rating += rev.rate;
        }
        this.rate = this.rating / data.reviews.length;
        console.log(this.rating / data.reviews.length);
      });
    });
  }

  onSubmit(loginForm: NgForm): void {
    this.pharmacieService.addReview(this.pharmacieID, loginForm.value.rating, loginForm.value.title, loginForm.value.review)
      .subscribe(
        response => {
          loginForm.resetForm();
          this.toastr.success('commentaire ajouter', '', {
            positionClass: 'toast-bottom-right'
          });
          this.pharmacieService.getPharmacie(this.pharmacieID).subscribe(data => {
            this.pharmacieService.dataUpdated.next(data);
          });
        }
      );
    // console.log(loginForm.value);
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  onNav(): void {
    this.router.navigate(['/pharmacie', this.pharmacieID]);
  }
}
