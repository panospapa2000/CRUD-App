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

  public editData: any;
  public saveData: any;

  form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    image: new FormControl(''),
  })

  initializeForm(data: UserModel) {
    this.form.setValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      image: data.image,
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: UserModel, private dialogRef: MatDialogRef<UpdateComponent>) {
    this.initializeForm(data);
    this.changeForm(data.id);
  }

  ngOnInit(): void {
  }

  changeForm(id: number) {
    this.userService.getUsersbyId(id).subscribe(item => {
      this.editData = item;
      this.form.setValue({
        id: this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        email: this.editData.email,
        phone: this.editData.phone,
        image: this.editData.image
      })
    })
  }

  applyUpdates() {
    if (this.form.valid) {
      this.userService.updateUser(this.form.getRawValue(), this.data.id).subscribe(item => {
        this.saveData = item;
        if (confirm("Are you sure you want to update this user?")){this.dialogRef.close();}
      })
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }
}
