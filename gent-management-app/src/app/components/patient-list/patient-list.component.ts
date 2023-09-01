import { FormBuilder, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from './../../models/patient.model';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  createdNew: boolean = false;
  selectedPatient: Patient | null = null;
  currentPage = 0;
  pageSize = 7;
  totalPatients = 0;
  searchQuery = '';
  addButtonClicked: boolean = false;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType );
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients(this.currentPage, this.pageSize, this.searchQuery).subscribe({
      next: (result) => {
        this.patients = result.patients;
        this.totalPatients = result.totalPatients;
        console.log(result);
      },
      error: (error) => console.error(error)
    });
    console.log("totalPatients" + this.totalPatients)
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  onPageChange(event:  PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.currentPage);
    this.getPatients(); // Load data for the current page
  }

  /*
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getPatients();
    this.cdr.detectChanges();
  }*/

  onSearch(): void {
    // Reset to first page when searching
    this.currentPage = 0;
    this.getPatients();
    this.selectedPatient = null;
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.totalPatients / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onAdd(): void {
    this.createdNew = true;
    const newPatient = <Patient>{};
    this.patients.unshift(newPatient);
    this.selectedPatient = newPatient;
    this.addButtonClicked = true;
    console.log(this.selectedPatient.id)
  }

  refreshPatientList() {
    console.log('refresed');
    this.currentPage = 0;
    this.getPatients();
    this.selectedPatient = null;
    this.addButtonClicked = false;

  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
