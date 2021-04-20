import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettComponent } from './profile-sett.component';

describe('ProfileSettComponent', () => {
  let component: ProfileSettComponent;
  let fixture: ComponentFixture<ProfileSettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
