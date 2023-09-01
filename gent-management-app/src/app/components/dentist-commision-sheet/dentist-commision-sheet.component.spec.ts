import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistCommisionSheetComponent } from './dentist-commision-sheet.component';

describe('DentistCommisionSheetComponent', () => {
  let component: DentistCommisionSheetComponent;
  let fixture: ComponentFixture<DentistCommisionSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DentistCommisionSheetComponent]
    });
    fixture = TestBed.createComponent(DentistCommisionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
