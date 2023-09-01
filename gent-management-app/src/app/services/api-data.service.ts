import { environment } from './../../environment/environment.prod';
import { Appointment } from './../models/appointment.model';
import { Dentist } from './../models/dentist.model';
import { PaginatedPatients, Patient } from './../models/patient.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commission, PaidCommission } from '../models/commision.model';


@Injectable({
  providedIn: 'root',
})
export class ApiDataService {

  private apiUrl: string = environment.apiUrl;



  constructor(private http: HttpClient) {}

  // Get patients from the API
  getPatients(page: number = 1, pageSize: number = 10, search: string = ''): Observable<PaginatedPatients> {
    console.log(`${this.apiUrl}/patients?page=${page}&pageSize=${pageSize}&search=${search}`);

    return this.http.get<PaginatedPatients>(`${this.apiUrl}/patients?page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  // Add a patient to the API
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  // Update a patient on the API
  editPatient(patient: Patient): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/patients/${patient.id}`, patient);
  }

  // Delete a patient from the API
  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${patientId}`);
  }

  getPatientAppointments(patientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/Appointment/${patientId}`);
  }

  // Add an appointment for a patient in the API
  addPatientAppointment(appointment: Appointment): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Appointment`, appointment);
  }

  // Update an appointment for a patient in the API
  editPatientAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/appointment/${appointment.id}`, appointment);
  }

  uploadPatientPicture(patientId: number, pictureFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('picture', pictureFile, pictureFile.name);

    return this.http.post(`${this.apiUrl}/patients/${patientId}/upload-picture`, formData);
  }

  getDentists():Observable<Dentist[]>{
    return this.http.get<Dentist[]>(`${this.apiUrl}/Dentist`);
  }

  getDentistCommissions(dentistCode: string, startDate: string, endDate: string): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/Appointment?dentistCode=${dentistCode}&startDate=${startDate}&endDate=${endDate}`);
  }

  saveCommissions(commissions: Commission[]): Observable<any>{
    console.log(commissions);
    return this.http.post<void>(`${this.apiUrl}/Comission`, commissions);
  }

  getDentistPaidCommissions(dentistCode: string): Observable<PaidCommission[]>{
    return this.http.get<PaidCommission[]>(`${this.apiUrl}/Comission/${dentistCode}`);
  }


}
