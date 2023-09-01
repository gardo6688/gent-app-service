import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Patient } from './../../../models/patient.model';
import { PatientService } from './../../../services/patient.service';


@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent {

  @Input() patient: Patient | null = null;
  @Input() createdNew: boolean = false;
  pictureFile: File | null = null;
  pictureUrl: string | null = null;
  pictureChanged = false;
  patientForm: FormGroup;
  @Output() changesSaved: EventEmitter<void> = new EventEmitter<void>();

  constructor(private patientService: PatientService, private fb: FormBuilder) {

     // Initialize the patientForm with FormBuilder
     this.patientForm = this.fb.group({

        firstName: ['', Validators.required],
        middleName: [''], // You can add validations if needed
        lastName: ['', Validators.required],
        contactNumber: ['', [Validators.required, Validators.pattern('^09[0-9]{9}$')]], // Assuming this is for PH mobile numbers
        address: [''], // Add validations if needed
        email: ['', [Validators.email, Validators.required]],

    });
  }

  cancel(): void{
    this.patient = null;
    this.changesSaved.emit();
  }


  savePatient(): void {
    if (this.patient && this.patientForm.valid) {
      console.log(this.patient);
      if (!this.createdNew) {
        // Call a service method to save the patient information
        this.patientService.editPatient(this.patient).subscribe(
          () => {
            this.changesSaved.emit();

              console.log('Patient information updated successfully.');

          },
          (error) => {
            console.error('An error occurred while saving patient information:', error);
          }
        );
      } else {
        this.patientService.addPatient(this.patient).subscribe(
          () => {


              this.createdNew = false;
              this.changesSaved.emit();

              console.log('New patient added successfully.');

          },
          (error) => {
            console.error('An error occurred while adding a new patient:', error);
          }
        );
      }
    }
    else{
      console.log('Input Invalid.');
    }
  }


}
