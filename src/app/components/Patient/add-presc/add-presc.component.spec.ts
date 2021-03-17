import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrescComponent } from './add-presc.component';

describe('AddPrescComponent', () => {
  let component: AddPrescComponent;
  let fixture: ComponentFixture<AddPrescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
