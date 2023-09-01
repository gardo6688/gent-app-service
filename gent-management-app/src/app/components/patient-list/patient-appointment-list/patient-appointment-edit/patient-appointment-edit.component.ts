import { Dentist } from "./../../../../models/dentist.model";
import { Observable } from "rxjs";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { map, startWith } from "rxjs/operators";
import { CurrencyPipe } from "@angular/common";
import { AppointmentService } from "./../../../../services/appointment.service";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Appointment } from "src/app/models/appointment.model";
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { DentistService } from "src/app/services/dentist.service";

import { ENTER, COMMA } from "@angular/cdk/keycodes";

@Component({
  selector: "app-patient-appointment-edit",
  templateUrl: "./patient-appointment-edit.component.html",
  styleUrls: ["./patient-appointment-edit.component.css"],
})
export class PatientAppointmentEditComponent {
  appointmentForm: FormGroup;
  @Input() appointment: Appointment | null = null;
  @Input() createdNew: boolean = false;
  @Input() patientId: number | undefined;
  @Output() changesSaved: EventEmitter<void> = new EventEmitter<void>();
  formattedPaymentAmount: string | null = null;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //dentists: string[] = [];
  dentistControl = new FormControl("");
  filteredDentist: Observable<string[]>;
  allDentist: string[] = [];
  formattedDate: string | null = null;

  @ViewChild("dentistInput") dentistInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private dentistService: DentistService
  ) {
    dentistService
      .getDentists()
      .pipe(map((dentists: Dentist[]) => dentists.map((item) => item.code)))
      .subscribe((codes: string[]) => {
        this.allDentist.push(...codes); // Push the codes into the array
        console.log(this.allDentist); // Now you can use the dentistCodes array
      });

    this.filteredDentist = this.dentistControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        console.log("Value:", value); // Debugging statement

        return value ? this._filter(value) : this.allDentist;
      })
    );

    this.appointmentForm = this.fb.group({
      formattedDate: ["", Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.appointment && this.appointment.date) {
      // Convert ISO date to 'yyyy-MM-dd' format
      const isoDate = new Date(this.appointment.date);
      const year = isoDate.getFullYear();
      const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
      const day = isoDate.getDate().toString().padStart(2, "0");

      this.formattedDate = `${year}-${month}-${day}`;
    }
  }

  remove(dentist: string): void {
    if (this.appointment) {
      const index = this.appointment.dentistsArray.indexOf(dentist);

      if (index >= 0) {
        this.appointment.dentistsArray.splice(index, 1);

        //this.announcer.announce(`Removed ${fruit}`);
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value && this.appointment) {
      if (
        !this.appointment.dentistsArray.includes(value) &&
        this.allDentist.includes(value)
      ) {
        this.appointment.dentistsArray.push(value);
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.dentistControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("autocomplete selected");

    if (this.appointment) {
      if (this.appointment.dentistsArray) {
        if (!this.appointment.dentistsArray.includes(event.option.viewValue)) {
          this.appointment.dentistsArray.push(event.option.viewValue);
        }
      } else {
        this.appointment.dentistsArray = [];
        this.appointment.dentistsArray.push(event.option.viewValue);
      }
    }

    this.dentistInput.nativeElement.value = "";
    this.dentistControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(
      this.allDentist.filter((dentist) =>
        dentist.toLowerCase().includes(filterValue)
      )
    );

    return this.allDentist.filter((dentist) =>
      dentist.toLowerCase().includes(filterValue)
    );
  }

  debugChipInputTokenEnd(event: MatChipInputEvent): void {
    console.log("chipInputTokenEnd event:", event);
  }

  debugOptionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log("optionSelected event:", event);
  }

  formatPaymentAmountOnInput(): void {
    if (
      this.appointment &&
      typeof this.appointment.paymentAmount === "string"
    ) {
      // Remove non-numeric characters except , and .
      const numericValue = parseFloat(
        this.appointment.paymentAmount.replace(/[^0-9.]/g, "")
      );

      // Format the numeric value with commas and dots
      const formattedValue = this.currencyPipe.transform(
        numericValue,
        "PHP",
        "symbol",
        "1.2-2"
      );
      this.appointment.paymentAmount = formattedValue ? formattedValue : "0.00";
    }
  }

  updateFormattedDate(event: any) {
    if (event.value instanceof Date) {
      // Format the selected date and assign it to the formattedDate variable.
      this.formattedDate = this.formatDate(event.value);
    } else {
      // Handle the case where the date picker value is not a Date object.
      // You can add custom logic here as needed.
      this.formattedDate = ""; // Set it to an empty string or handle the error.
    }
    this.updateDate();
    console.log(this.formatDate);
  }

  // Helper function to format a Date object as "MM/DD/YYYY".
  formatDate(date: Date): string {
    const month = date.getMonth() + 1; // Months are zero-indexed.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  updateDate(): void {
    const dateComponents = this.formattedDate
      ? this.formattedDate.split("-")
      : [];

    const dateObject = new Date(
      parseInt(dateComponents[0]),
      parseInt(dateComponents[1])-1,
      parseInt(dateComponents[2])
    );
    if (this.appointment) {
      this.appointment.date = dateObject;
    }
  }

  onCancel(): void {
    this.appointment = null;
    this.changesSaved.emit();
  }
  onSave(): void {
    if (this.appointmentForm.valid) {
      if (this.appointment) {
        console.log(this.formattedDate);
        this.updateDate();

        // Split the date string into year, month, and day components
        if (this.appointment.dentistsArray) {
          this.appointment.dentists = this.appointment.dentistsArray.join("/");
        }
        console.log(this.appointment);
        if (!this.createdNew) {
          this.appointmentService
            .editPatientAppointment(this.appointment)
            .subscribe(
              () => {
                this.changesSaved.emit();
                this.appointmentForm.reset();

                console.log("Patient appointment updated successfully.");
              },
              (error) => {
                console.error(
                  "An error occured while saving patient's appointment"
                );
              }
            );
        } else {
          this.appointment.patientId =
            this.patientId != undefined ? this.patientId : 0;
          this.appointmentService
            .addPatientAppointment(this.appointment)
            .subscribe(
              () => {
                this.changesSaved.emit();
                this.appointmentForm.reset();
                console.log("Patient appointment added successfully.");
              },
              (error) => {
                console.error(
                  "An error occured while saving patient's appointment"
                );
              }
            );
        }
      }
    }
  }
}
