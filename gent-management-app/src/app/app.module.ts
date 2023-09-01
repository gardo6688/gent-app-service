import { MatDividerModule } from '@angular/material/divider';
import { PatientAppointmentListComponent } from './components/patient-list/patient-appointment-list/patient-appointment-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailComponent } from './components/patient-list/patient-detail/patient-detail.component';
import { PatientEditComponent } from './components/patient-list/patient-edit/patient-edit.component';
import { DentistListComponent } from './components/dentist-list/dentist-list.component';
import { DentistEditComponent } from './components/dentist-list/dentist-edit/dentist-edit.component';
import { AppointmentService } from './services/appointment.service';
import { DentistService } from './services/dentist.service';
import { PatientService } from './services/patient.service';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientAppointmentEditComponent } from './components/patient-list/patient-appointment-list/patient-appointment-edit/patient-appointment-edit.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { GentNotificationDialogComponent } from './components/gent-notification-dialog/gent-notification-dialog.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { DentistCommisionSheetComponent } from './components/dentist-commision-sheet/dentist-commision-sheet.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientDetailComponent,
    PatientEditComponent,
    PatientAppointmentEditComponent,
    DentistListComponent,
    DentistEditComponent,
    PatientAppointmentListComponent,
    HeaderComponent,
    GentNotificationDialogComponent,
    DentistCommisionSheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [PatientService, AppointmentService, DentistService, CurrencyPipe, MatChipsModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
