import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PharmacieCheckoutComponent} from './pharmacie-checkout.component';

describe('PharmacieCheckoutComponent', () => {
  let component: PharmacieCheckoutComponent;
  let fixture: ComponentFixture<PharmacieCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacieCheckoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacieCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
