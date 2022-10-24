import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../../core/models/user';
import { UserService } from '../../shared/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  
  user: User | undefined;
  title = 'imgtobase64';
  myimage!: Observable<ImageBitmap> | string;
  base64code!: string

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
 
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  goForward(): void {
    this.location.forward();
  }
  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }
  
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<string>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }

  readFile(file: File, subscriber: Subscriber<string | ArrayBuffer | null>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
}
  
}

