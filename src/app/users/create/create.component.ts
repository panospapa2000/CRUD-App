import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from '../../core/Model/userModel';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createData: UserModel[] = [];

  creationForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[+][0-9 ]+')]),
    image: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private routing: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  createUserFunction() {
    this.userService.createUser(this.creationForm.getRawValue()).subscribe(item => {
      this.createData = item;
      this.snackBar.open("This user has been successfully created!!!", "Okay");
    })
  }

  onFileSelected(event: any) {
    let file: File = event.target.files[0];
    if (!this.imageValidator(file.name)) {
      this.snackBar.open("Selected file format is not supported. Please select a file with .png, .jpg or .jpeg extension.", "Understood", { duration: 5000 });
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.creationForm.patchValue({ image: reader.result });
      };
    }
  }
  //Added custom validator for supporting specific files
  imageValidator(name: string) {
    var extension = name.substring(name.lastIndexOf('.') + 1);
    if (extension.toLowerCase() == 'png' || extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'jpeg') {
      return true
    }
    else { return false; }
  }

  goBack() {
    this.routing.navigate(['view']);
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
}