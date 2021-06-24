import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorsListeComponent} from './doctors-liste.component';

describe('DoctorsListeComponent', () => {
  let component: DoctorsListeComponent;
  let fixture: ComponentFixture<DoctorsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsListeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
