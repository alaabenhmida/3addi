import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacieSearchComponent } from './pharmacie-search.component';

describe('PharmacieSearchComponent', () => {
  let component: PharmacieSearchComponent;
  let fixture: ComponentFixture<PharmacieSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacieSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
