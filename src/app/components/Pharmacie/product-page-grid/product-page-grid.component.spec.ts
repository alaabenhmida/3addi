import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageGridComponent } from './product-page-grid.component';

describe('ProductPageGridComponent', () => {
  let component: ProductPageGridComponent;
  let fixture: ComponentFixture<ProductPageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
