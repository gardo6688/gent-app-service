import { Appointment } from "./appointment.model";

export interface Commission {
  id?: number;
  dentistCode: string;
  datePaid?: Date;
  commissionAmount?: number;
  deduction?: number;
  deductionRemarks?: string;
  appointment: Appointment
  commisionReference?: Guid;
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Example of a bunch of GUIDs
for (var i = 0; i < 20; i++) {
  var id = Guid.newGuid();
  console.log(id);
}

export interface PaidCommission {
  id: number;
  startDate: Date;
  endDate: Date;
  amount: number;
  datePaid: Date;
}
