import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersComponent } from './users/users.component';
import { CreateComponent } from './users/create/create.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd-intership';

  constructor(public dialog:MatDialog){}

  openCreateDialog() {
    this.dialog.open(CreateComponent, {
          width:'30%'
    });
  }
}
