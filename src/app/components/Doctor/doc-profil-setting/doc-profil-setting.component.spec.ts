import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocProfilSettingComponent} from './doc-profil-setting.component';

describe('DocProfilSettingComponent', () => {
  let component: DocProfilSettingComponent;
  let fixture: ComponentFixture<DocProfilSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocProfilSettingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocProfilSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
