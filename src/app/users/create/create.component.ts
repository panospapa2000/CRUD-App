import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

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
      id: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      image: new FormControl('',Validators.required)
    });
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
