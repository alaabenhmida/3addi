import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PharmacieSettingComponent} from './pharmacie-setting.component';

describe('PharmacieSettingComponent', () => {
  let component: PharmacieSettingComponent;
  let fixture: ComponentFixture<PharmacieSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacieSettingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacieSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
