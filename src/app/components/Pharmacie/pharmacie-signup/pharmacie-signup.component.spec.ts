import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PharmacieSignupComponent} from './pharmacie-signup.component';

describe('PharmacieSignupComponent', () => {
  let component: PharmacieSignupComponent;
  let fixture: ComponentFixture<PharmacieSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacieSignupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacieSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
