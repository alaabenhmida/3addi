import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharDemandesComponent } from './phar-demandes.component';

describe('PharDemandesComponent', () => {
  let component: PharDemandesComponent;
  let fixture: ComponentFixture<PharDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharDemandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
