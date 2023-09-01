
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { ApiDataService } from './api-data.service';
import { map } from 'rxjs/operators';
import { Commission, PaidCommission } from '../models/commision.model';

ApiDataService
@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  constructor(private apiDataService: ApiDataService) {}
  private commisions: Commission[] = [];


  getDentistCommisions(dentistCode: string, startDate: string, endDate: string): Observable<Commission[]> {
    // Assuming this.apiDataService.getDentistCommissions() returns an Observable<Commission[]>
    return this.apiDataService.getDentistCommissions(dentistCode, startDate, endDate)
      .pipe(
        map(appointment => {
          return appointment.map(appointmentData => {
            const commission: Commission = {
              dentistCode: dentistCode,
              appointment: appointmentData,
              commissionAmount: this.getCommissionAmount(appointmentData.serviceRendered, +appointmentData.paymentAmount),
              deduction: 0.00,
              deductionRemarks: "",
            };
            return commission;
          });
        })
      );
  }

  saveCommissions(commissions: Commission[]): Observable<void>{
    console.log(commissions);

    return this.apiDataService.saveCommissions(commissions);
  }


  getCommissionAmount(serviceRendered: string, paymentAmount: number): number {
    console.log(serviceRendered);
    console.log(paymentAmount);

    if (serviceRendered.includes("OA") || serviceRendered.includes("OI")) {
        return +(paymentAmount * 0.05).toFixed(2);
    } else {
        return +(paymentAmount * 0.10).toFixed(2);
    }
  }

  getDentistPaidCommissions(dentistCode: string): Observable<PaidCommission[]>{
    return this.apiDataService.getDentistPaidCommissions(dentistCode);
  }




  // You can also add a method to delete an appointment if needed.
}
