import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../core/models/user';
import { HeroService } from '../shared/hero.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, Subscriber } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  users: User[] = [];
  test: string="0"
  
  
constructor(private heroService: HeroService,
  private clipboard: Clipboard,
  private location: Location) { }

  ngOnInit(): void {
  }
  add(firstName: string,lastName: string,email: string,phone: string, image: string): void {
    firstName = firstName.trim();
    if (!firstName) { return; }
    this.heroService.addHero({ firstName,lastName,email,phone,image } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  title = 'imgtobase64';
  myimage!: Observable<any>;
  base64code!: any

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
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

goBack(): void {
  this.location.back();
}
}

