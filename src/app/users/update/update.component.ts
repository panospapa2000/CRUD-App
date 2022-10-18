import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userForm!:any;
  constructor(private userService:UserService, @Inject(MAT_DIALOG_DATA) public editData :any, private dialogRef: MatDialogRef<UpdateComponent>) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.pattern('[+][0-9 ]+')]),
      image: new FormControl('',Validators.required)
    });

    this.userForm.setValue({
      id:this.editData.id,
      firstName:this.editData.firstName,
      lastName:this.editData.lastName,
      email:this.editData.email,
      phone:this.editData.phone,
      image:this.editData.image
    })
  }

  getId(){
    return this.userForm.get('id');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  updateUser(){
    this.userService.updateUser(this.userForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("User updated successfully!");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating user");
      }
    })
  }

}
