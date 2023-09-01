import { Observable } from 'rxjs';
import { Dentist } from './../models/dentist.model';
import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';

ApiDataService
@Injectable({
  providedIn: 'root',
})
export class DentistService {
  constructor(private apiDataService: ApiDataService)
  {

  }

  getDentists(): Observable<Dentist[]>
  {
    return this.apiDataService.getDentists();
  }

  /*addDentist(addedDentist: Dentist): void {
    this.dentists.push(addedDentist);
  }

  editDentist(updatedDentist: Dentist): void {
    const index = this.dentists.findIndex((a) => a.ID === updatedDentist.ID);
    if (index !== -1) {
      this.dentists[index] = updatedDentist;
    }
  }*/

  // You can also add a method to delete an appointment if needed.
}
