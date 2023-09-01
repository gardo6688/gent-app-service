import { Patient } from './../../../models/patient.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {

  @Input() patient: Patient | null = null;
}
