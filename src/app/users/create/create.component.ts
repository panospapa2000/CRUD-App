import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userForm!:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.pattern('[+][0-9 ]+')]),
      image: new FormControl('',Validators.required)
    });
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

    console.log(this.userForm.value);
    if(this.userForm.valid){
      this.userService.createUser(this.userForm.value).subscribe({
        next:(res)=>{
          alert("User successfully created!");
        },
        error:()=>{
          alert("Error while creating user");
        }
      });
    }
  }

}
