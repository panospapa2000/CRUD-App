import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userEmail: new FormControl(''),
    phone: new FormControl(''),
    image: new FormControl(''),
  })

  initializeForm() {
    this.form.setValue({
      firstName: 'First Name',
      lastName: 'Last Name',
      userEmail: 'Email',
      phone: 'Phone',
      image: 'Image',
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  getExistData(id: number){
    this.userService.getUserByID(id);
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

}
