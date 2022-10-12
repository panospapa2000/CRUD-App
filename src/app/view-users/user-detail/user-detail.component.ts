import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../../core/models/user';
import { HeroService } from '../../shared/hero.service';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.user) {
      this.heroService.updateHero(this.user)
        .subscribe(() => this.goBack());
    }
  }

  delete(hero: User): void {
    this.heroService.deleteHero(hero.id).subscribe(() => this.goBack());
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
  
}

