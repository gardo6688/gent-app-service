import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentEditComponent } from './patient-appointment-edit.component';

describe('PatientAppointmentEditComponent', () => {
  let component: PatientAppointmentEditComponent;
  let fixture: ComponentFixture<PatientAppointmentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientAppointmentEditComponent]
    });
    fixture = TestBed.createComponent(PatientAppointmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
