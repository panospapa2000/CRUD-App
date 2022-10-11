import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../Model/userModel';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  editData: any;

  form: FormGroup = new FormGroup({
    userID: new FormControl({ value: "", disabled: true }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    image: new FormControl(''),
  })

  initializeForm(data: UserModel) {
    this.form.setValue({
      userID: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userEmail: data.email,
      phone: data.phone,
      image: data.image,
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: UserModel, private dialogRef: MatDialogRef<UpdateComponent>) {
    this.initializeForm(data);
  }

  ngOnInit(): void {
  }

  getData() {
    this.userService.getUsers().subscribe(item => {
      this.editData = item;
      if (this.editData != null) {
        this.form.setValue(
          {
            firstName: this.editData.firstName,
            lastName: this.editData.lastName,
            userEmail: this.editData.email,
            phone: this.editData.phone,
            image: this.editData.image
          })
      }
    })
  }

  applyUpdates() {
      this.userService.updateUser(this.form.value()).subscribe(item=>{
        this.editData = item;
        this.dialogRef.close(this.editData);
      })
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }
}
