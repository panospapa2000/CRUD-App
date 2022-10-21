import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../core/services/mat-dialog.service';
import { UserModel } from '../../core/Model/userModel';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  public saveData: UserModel[] = [];

  updateForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[+][0-9 ]+')]),
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


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private dialogRef: MatDialogRef<UpdateComponent>, private snackBar: MatSnackBar, private dialogService: DialogService) {
    this.initializeForm(data);
  }

  ngOnInit(): void {

  }

  applyUpdates() {
    if (this.updateForm.valid) {
      this.dialogService.openConfirmDialog('Proceed with the user update?').afterClosed().subscribe(result => {
        if (result) {
          this.userService.updateUser(this.updateForm.getRawValue(), this.data.id).subscribe(item => {
            this.saveData = item;
            this.dialogRef.close(this.saveData);
            this.snackBar.open("This user has been successfully updated!!!", "Okay", { verticalPosition: 'top', duration: 3000 })
          }
          )
        }
      })
    }
  }

  onFileSelected(event: any) {
    let file: File = event.target.files[0];
    if (!this.imageValidator(file.name)) {
      this.snackBar.open("Selected file format is not supported. Please select a file with .png, .jpg or .jpeg extension.", "Retry", { duration: 5000 });
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateForm.patchValue({ image: reader.result });
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

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get phone() {
    return this.updateForm.get('phone');
  }
}
