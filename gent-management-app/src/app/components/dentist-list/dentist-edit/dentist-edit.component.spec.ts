import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistEditComponent } from './dentist-edit.component';

describe('DentistEditComponent', () => {
  let component: DentistEditComponent;
  let fixture: ComponentFixture<DentistEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DentistEditComponent]
    });
    fixture = TestBed.createComponent(DentistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
