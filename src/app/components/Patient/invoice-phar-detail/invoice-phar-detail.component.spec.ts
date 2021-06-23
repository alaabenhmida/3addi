import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePharDetailComponent } from './invoice-phar-detail.component';

describe('InvoicePharDetailComponent', () => {
  let component: InvoicePharDetailComponent;
  let fixture: ComponentFixture<InvoicePharDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePharDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePharDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
