import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedPatients, Patient } from '../models/patient.model';
import { ApiDataService } from './api-data.service';

ApiDataService

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private apiDataService: ApiDataService) {}

  getPatients(page: number = 1, pageSize: number = 10, search: string = ''): Observable<PaginatedPatients> {
    return this.apiDataService.getPatients(page, pageSize, search);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.apiDataService.addPatient(patient);
  }

  editPatient(updatedPatient: Patient): Observable<void> {
    return this.apiDataService.editPatient(updatedPatient);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.apiDataService.deletePatient(patientId);
  }

  uploadPatientPicture(patientId: number, pictureFile: File): Observable<any> {

    return this.apiDataService.uploadPatientPicture(patientId, pictureFile);
  }


}
