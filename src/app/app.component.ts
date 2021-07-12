import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bike-inspection';
  output = '';

  onFieldChange(field: any) {
    console.log("field: ", field.value);
    this.output = field.value;
  }
}
