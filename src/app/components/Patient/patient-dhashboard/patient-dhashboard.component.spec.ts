import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDhashboardComponent} from './patient-dhashboard.component';

describe('PatientDhashboardComponent', () => {
  let component: PatientDhashboardComponent;
  let fixture: ComponentFixture<PatientDhashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientDhashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
