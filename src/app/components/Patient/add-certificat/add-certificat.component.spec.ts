import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificatComponent } from './add-certificat.component';

describe('AddCertificatComponent', () => {
  let component: AddCertificatComponent;
  let fixture: ComponentFixture<AddCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCertificatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
