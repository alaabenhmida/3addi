import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocCheckDetailsComponent} from './doc-check-details.component';

describe('DocCheckDetailsComponent', () => {
  let component: DocCheckDetailsComponent;
  let fixture: ComponentFixture<DocCheckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocCheckDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
