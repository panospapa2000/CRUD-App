import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  creationForm: any;
  createData: any;
  
  constructor(private userService: UserService, private routing: Router) { }

  ngOnInit(): void {
    this.creationForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[+][0-9 ]+')]),
      image: new FormControl('', Validators.required)
    })
  }

  get firstName() {
    return this.creationForm.get('firstName');
  }

  get lastName() {
    return this.creationForm.get('lastName');
  }

  get email() {
    return this.creationForm.get('email');
  }

  get phone() {
    return this.creationForm.get('phone');
  }

  createUserFunction() {
    this.userService.createUser(this.creationForm.value).subscribe(item => {
      this.createData = item;
      window.alert("This user has been successfully created!!!");
    })
  }

  goBack() {
    this.routing.navigate(['view']);
  }
}