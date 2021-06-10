import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharCheckDetailsComponent } from './phar-check-details.component';

describe('PharCheckDetailsComponent', () => {
  let component: PharCheckDetailsComponent;
  let fixture: ComponentFixture<PharCheckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharCheckDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharCheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
