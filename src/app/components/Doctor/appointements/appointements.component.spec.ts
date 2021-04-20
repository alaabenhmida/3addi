import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementsComponent } from './appointements.component';

describe('AppointementsComponent', () => {
  let component: AppointementsComponent;
  let fixture: ComponentFixture<AppointementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
