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

  updateForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]),
    image: new FormControl('', Validators.required)
  })

  initializeForm(data: UserModel) {
    this.updateForm.setValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      image: data.image,
    })
  }


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: UserModel, private dialogRef: MatDialogRef<UpdateComponent>) {
    this.initializeForm(data);
    this.changeForm(data.id);
  }

  ngOnInit(): void {
    // this.updateForm = new FormGroup({
    //   id: new FormControl({ value: '', disabled: true }),
    //   firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    //   lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    //   email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    //   phone: new FormControl('', [Validators.required, Validators.pattern('[+][0-9 ]+')]),
    //   image: new FormControl('', Validators.required)
    // })
  }

  changeForm(id: number) {
    this.userService.getUsersbyId(id).subscribe(item => {
      this.editData = item;
      this.updateForm.setValue({
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
    if (this.updateForm.valid && (confirm("Are you sure you want to update this user?"))) {
      this.userService.updateUser(this.updateForm.getRawValue(), this.data.id).subscribe(item => {
        this.saveData = item;
        this.dialogRef.close();
      })
    }
  }

//   get firstName(){
//     return this.updateForm.get('firstName');
//   }

//   get lastName(){
//     return this.updateForm.get('lastName');
//   }

//   get email(){
//     return this.updateForm.get('email');
//   }

//   get phone(){
//     return this.updateForm.get('phone');
//   }
}
