import { Appointment } from "./appointment.model";

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  contactNumber: string;
  email: string;
  picture: ArrayBuffer;
  patientAppointments: Appointment[];
}

export interface PaginatedPatients {
  patients: Patient[];
  totalPatients: number;
}
