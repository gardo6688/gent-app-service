import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedMenu: string = "PA";


  handleMenuItemSelection(item: string):void{
    this.selectedMenu = item;
    console.log('emitted');
  }
}
