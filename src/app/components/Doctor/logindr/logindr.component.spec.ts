import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindrComponent } from './logindr.component';

describe('LogindrComponent', () => {
  let component: LogindrComponent;
  let fixture: ComponentFixture<LogindrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogindrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogindrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
