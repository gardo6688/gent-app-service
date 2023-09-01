import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GentNotificationDialogComponent } from './gent-notification-dialog.component';

describe('GentNotificationDialogComponent', () => {
  let component: GentNotificationDialogComponent;
  let fixture: ComponentFixture<GentNotificationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GentNotificationDialogComponent]
    });
    fixture = TestBed.createComponent(GentNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
