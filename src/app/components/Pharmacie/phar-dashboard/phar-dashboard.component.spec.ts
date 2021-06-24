import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PharDashboardComponent} from './phar-dashboard.component';

describe('PharDashboardComponent', () => {
  let component: PharDashboardComponent;
  let fixture: ComponentFixture<PharDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharDashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
