import { Form, FormControl } from "@angular/forms";
export interface userFormGroup {

    id?:FormControl<number>;
    firstName:FormControl<string>;
    lastName:FormControl<string>;
    email:FormControl<string>;
    phone:FormControl<string>;
    image:FormControl<string>; 
    //this interface is used so we can have a strictly typed FormGroup
  }