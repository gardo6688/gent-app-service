import { PaymentType } from './enums.model';
import { Dentist } from "./dentist.model";
import { Patient } from './patient.model';

export interface Appointment {
  id: number;
  date: Date;
  serviceRendered: string;
  paymentType: string;
  dentists: string;
  paymentAmount: string;
  patient: Patient;
  patientId: number;
  dentistsArray: string[];
}
