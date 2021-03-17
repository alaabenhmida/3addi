import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDrComponent } from './signup-dr.component';

describe('SignupDrComponent', () => {
  let component: SignupDrComponent;
  let fixture: ComponentFixture<SignupDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupDrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
