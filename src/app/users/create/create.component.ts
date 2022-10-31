import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { UsersComponent } from '../users.component';
import { UserService } from 'src/app/core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { userFormGroup } from 'src/app/core/model/userFormGroup';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {

  

   userForm:FormGroup<userFormGroup> = new FormGroup<userFormGroup>({
    firstName:new FormControl<string>('',{nonNullable:true,validators:[Validators.required, Validators.pattern('[a-zA-Z]+$')]}),
    lastName: new FormControl<string>('',{nonNullable:true,validators:[Validators.required, Validators.pattern('[a-zA-Z]+$')]}),
    email: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.email]}),
    phone: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.pattern('[+][0-9 ]+')]}),
    image: new FormControl<string>('',{nonNullable:true,validators:Validators.required})
  });

  fileName = '';

  constructor(private userService:UserService,private dialogRef:MatDialogRef<CreateComponent>, private http: HttpClient) { }

  ngOnInit(): void {


    
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


  onCreate(): void {

    if(this.userForm.valid){
      this.userService.createUser(this.userForm.value).subscribe({
        next:(res)=>{
          alert("User successfully created!");
          this.dialogRef.close(this.userForm.value);
        },
        error:()=>{
          alert("Error while creating user");
        }
      });
    }
  }
  
  onFileSelected(event:any) {

    const file:File = event.target.files[0];
    if(this.isImage(file.name)){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.userForm.patchValue({image:reader.result?.toString()});
      };
    }
    else{
      alert("The file you tried to upload is not an image. Please try again.");
    }

    }

    isImage(name:string){
      const fileType =name.substring(name.lastIndexOf('.') + 1);
      console.log(fileType);
      if (fileType=='jpg' || fileType=='png' || fileType=='jpeg'){
        return true;
      }
      else{
        return false;
      }
    }
}




