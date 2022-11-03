import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { userFormGroup } from 'src/app/core/model/userFormGroup';
import { userFormValues } from 'src/app/core/model/userFormValues';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userForm:FormGroup<userFormGroup> = new FormGroup<userFormGroup>({
    id:new FormControl<number>(0,{nonNullable:true}),
    firstName:new FormControl<string>('',{nonNullable:true,validators:[Validators.required, Validators.pattern('[a-zA-Z]+$')]}),
    lastName: new FormControl<string>('',{nonNullable:true,validators:[Validators.required, Validators.pattern('[a-zA-Z]+$')]}),
    email: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.email]}),
    phone: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.pattern('[+][0-9 ]+')]}),
    image: new FormControl<string>('',{nonNullable:true,validators:Validators.required})
  });

  constructor(private userService:UserService, @Inject(MAT_DIALOG_DATA) public editData:User, private dialogRef: MatDialogRef<UpdateComponent>) { }

  ngOnInit(): void {



    console.log(this.editData.id)
    this.userForm.setValue({

      id:this.editData.id,
      firstName:this.editData.firstName,
      lastName:this.editData.lastName,
      email:this.editData.email,
      phone:this.editData.phone,
      image:this.editData.image
    })
  }

    get getId(){
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
        this.dialogRef.close(this.userForm.value);
      },
      error:()=>{
        alert("Error while updating user");
      }
    })
  }

}
