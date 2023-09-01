import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { ApiDataService } from './api-data.service';

ApiDataService
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private apiDataService: ApiDataService) {}
  private appointments: Appointment[] = [];

  addPatientAppointment(appointment: Appointment): Observable<void> {
    return this.apiDataService.addPatientAppointment(appointment);
  }

  editPatientAppointment(updatedAppointment: Appointment): Observable<Appointment>{
    return this.apiDataService.editPatientAppointment(updatedAppointment);
  }


  getPatientAppointments(patientId: number): Observable<Appointment[]> {
    return this.apiDataService.getPatientAppointments(patientId);
  }

  // You can also add a method to delete an appointment if needed.
}
