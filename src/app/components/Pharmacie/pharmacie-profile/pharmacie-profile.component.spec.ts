import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacieProfileComponent } from './pharmacie-profile.component';

describe('PharmacieProfileComponent', () => {
  let component: PharmacieProfileComponent;
  let fixture: ComponentFixture<PharmacieProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacieProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacieProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
