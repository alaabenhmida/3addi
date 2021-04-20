import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavDocsComponent } from './fav-docs.component';

describe('FavDocsComponent', () => {
  let component: FavDocsComponent;
  let fixture: ComponentFixture<FavDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
