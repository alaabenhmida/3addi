import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDemandesComponent } from './doc-demandes.component';

describe('DocDemandesComponent', () => {
  let component: DocDemandesComponent;
  let fixture: ComponentFixture<DocDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDemandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
