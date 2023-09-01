import { Appointment } from 'src/app/models/appointment.model';

import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-patient-appointment-list',
  templateUrl: './patient-appointment-list.component.html',
  styleUrls: ['./patient-appointment-list.component.css']
})
export class PatientAppointmentListComponent implements OnInit {
  @Input() patientId: number | undefined;
  appointments: Appointment[] = [];
  editedIndex: number | undefined;
  selectedAppointement: Appointment | null = null
  createdNew: boolean = false;
  addButtonClicked: boolean = false;

  constructor(private patientAppointmentService: AppointmentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPatientAppointments();
    console.log(this.selectAppointment);
  }

  ngOnChanges(): void {
    if (this.patientId) {
      this.getPatientAppointments();
    }
  }

  onAdd(){
    this.createdNew = true;
    const newAppointment = <Appointment>{};
    this.appointments.unshift(newAppointment);
    this.selectedAppointement = newAppointment;
    this.addButtonClicked = true;
  }


  getPatientAppointments(): void {
    const patientId = this.patientId ?? -1;
    this.patientAppointmentService.getPatientAppointments(patientId).subscribe(
      (appointments) => {
        this.appointments = appointments;
        this.selectedAppointement = null;
        this.addButtonClicked = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectAppointment(appointment: Appointment): void {

    if(appointment.dentists)
    {
    const codes: string[] = appointment.dentists.split("/");

    appointment.dentistsArray = [];
    appointment.dentistsArray.push(...codes);
    }

    this.selectedAppointement = appointment;
  }

  formatDate(dateStr: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateStr).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  refreshAppointmentList() {
    console.log('refresed');
    this.getPatientAppointments();
    this.selectedAppointement = null;
    this.addButtonClicked = false;
    this.createdNew = false;
  }


}
