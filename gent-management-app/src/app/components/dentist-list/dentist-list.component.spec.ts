import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistListComponent } from './dentist-list.component';

describe('DentistListComponent', () => {
  let component: DentistListComponent;
  let fixture: ComponentFixture<DentistListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DentistListComponent]
    });
    fixture = TestBed.createComponent(DentistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
