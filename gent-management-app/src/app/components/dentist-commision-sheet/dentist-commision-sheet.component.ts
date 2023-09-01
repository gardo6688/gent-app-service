import { DentistService } from 'src/app/services/dentist.service';
import { CommissionService } from './../../services/commision.service';
import { MatAccordion } from '@angular/material/expansion';
import { Component, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Commission, PaidCommission } from 'src/app/models/commision.model';
import { DatePipe } from '@angular/common';
import { Dentist } from 'src/app/models/dentist.model';
import { compileInjectable } from '@angular/compiler';

@Component({
  selector: 'app-dentist-commision-sheet',
  templateUrl: './dentist-commision-sheet.component.html',
  styleUrls: ['./dentist-commision-sheet.component.css']
})
export class DentistCommisionSheetComponent {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  dentists: Dentist[] = [];
  commissions: any[] = [];
  paidCommissions: any[] = [];
  displayedColumns: string[] = ['date','serviceRendered', 'paymentAmount', 'paymentType', 'deduction', 'deductionRemarks', 'commissionAmount', 'totalAmount'];
  startDate: Date = new Date();
  endDate: Date = new Date();
  dentistCode: string = "";
  selectedDentistName: string = '';
  totalCommission: number = 0;
  totalAmount: number = 0;
  totalRemarks: number = 0;
  errorMessage: string = "";

  constructor(private commissionService: CommissionService, private datePipe: DatePipe, private dentistService: DentistService, datepipe: DatePipe){
    this.datePipe = new DatePipe('en-US');
    this.dentistService.getDentists().subscribe({
      next: (result) =>{
        this.dentists = result.map(dentist => ({...dentist}));
      }
    })

  }

  ngOnInit() {
    // Calculate the values for totalCommission, totalRemarks, and totalAmount here
    // For example:
    this.totalCommission = 0;
    this.totalRemarks = 0;
    this.totalAmount = 0;
  }

  getDentistCommision()
  {
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if(formattedStartDate && formattedEndDate)
    {
      const datePipe = new DatePipe('en-US');
      this.commissionService.getDentistPaidCommissions(this.dentistCode).subscribe({
        next: (result) => {
          this.paidCommissions = result.map(paidCommission => ({...paidCommission,
          fStartDate: datePipe.transform(paidCommission.startDate, 'MMMM dd, yyyy'),
          fEndDate: datePipe.transform(paidCommission.endDate, 'MMMM dd, yyyy'),
          fDatePaid: datePipe.transform(paidCommission.endDate, 'MMMM dd, yyyy'),
          }))
        },
        error: (error) => console.error(error)

      });


      this.commissionService.getDentistCommisions(this.dentistCode, formattedStartDate, formattedEndDate).subscribe({
        next: (result) => {
          // Loop through the result array and add the 'editable' property to each object
          this.commissions = result.map(commision => ({ ...commision,
            totalAmount: commision.commissionAmount,
            date: datePipe.transform(commision.appointment.date, 'MM/dd/yyyy'),
            amount: parseInt(commision.appointment.paymentAmount).toFixed(2)
          }));
          console.log(this.commissions);
          this.computeTotals();
        },
        error: (error) => console.error(error)
      });
    }
    else
    {
      this.errorMessage = "Overlapped";
      console.log(this.errorMessage);
    }

  }

  onBlur(event: any, commision: any, fieldName: string) {
    const newValue = event.target.innerText.trim();
    commision[fieldName] = newValue;
    commision.editable = true;

    console.log(this.commissions);
    // You can also send an HTTP request to save the updated value to the server if needed.
  }

  onDeductionInput(event: any, commision: any) {
    // Parse the input value as a number (assuming it's a valid number)
    if(event.target.value == "")
    {
      commision.deduction = 0.00;
      commision.totalAmount = (commision.commissionAmount + commision.deduction).toFixed(2);
    }
    if (!isNaN(parseFloat(event.target.value)))
    {
      const deduction = parseFloat(event.target.value);

      // Update the commision's deduction property with the new value
      commision.deduction = deduction

      // Recalculate the totalAmount
      commision.totalAmount = (commision.commissionAmount + commision.deduction).toFixed(2);

    }
    this.computeTotals();
  }

  getTotal(): string {
    let total = 0;
    for (const commission of this.commissions) {
      total += parseFloat(commission.totalAmount); // Convert to number and sum
    }
    return total.toFixed(2); // Convert back to string with 2 decimal places
  }

  onDentistSelectionChange() {
    const selectedDentist = this.dentists.find(dentist => dentist.code === this.dentistCode);
    this.selectedDentistName = selectedDentist ? selectedDentist.name : '';
  }

  saveCommissions(){

    this.commissionService.saveCommissions(this.commissions).subscribe(
      () => {

        console.log("commissions saved");
      },
      (error) => {
        console.error(
          "commissions error" + error
        );
      });
  }

  computeTotals()
  {
    if(this.commissions.length > 0)
    {
      this.totalRemarks = this.commissions.reduce((accumulator, commission) => {
        return accumulator + (commission.deduction || 0); // Use 0 as a default value in case commissionAmount is undefined
      }, 0);

      this.totalAmount = this.commissions.reduce((accumulator, commission) => {
        return accumulator + (parseFloat(commission.totalAmount)|| 0); // Use 0 as a default value in case commissionAmount is undefined
      }, 0);
      console.log(this.totalAmount);

      this.totalCommission = this.commissions.reduce((accumulator, commission) => {
        return accumulator + (commission.commissionAmount || 0); // Use 0 as a default value in case commissionAmount is undefined
      }, 0);
    }
  }








}
