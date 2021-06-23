import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatDetailsComponent } from './certificat-details.component';

describe('CertificatDetailsComponent', () => {
  let component: CertificatDetailsComponent;
  let fixture: ComponentFixture<CertificatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
