import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createData : any;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService)  { }

  ngOnInit(): void {

  }

  creationForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  })

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  createUserFunction(){
    if(this.creationForm.valid)
    {
      this.userService.createUser(this.creationForm.value).subscribe(item => {
        this.createData = item;
        window.alert("This user has been successfully created!!!");
      })
    }
  }
}