import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationMessage } from './../../models/notification.message.model';
import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-gent-notification-dialog',
  templateUrl: './gent-notification-dialog.component.html',
  styleUrls: ['./gent-notification-dialog.component.css']
})
export class GentNotificationDialogComponent {
  @Input() message : NotificationMessage | undefined;
  status: string = ""; action: string ="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: NotificationMessage }) {}

  ngOnInit(): void {
    if (this.data.message) {
      this.status = this.data.message.status;
      this.action = this.data.message.message;
    }
  }


}
