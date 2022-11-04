import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { User } from '../../core/models/user';
import { User_Product } from 'src/app/core/models/user_products';
import { Product } from 'src/app/core/models/products';
import { UserService } from '../../shared/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  
  user: User | undefined;
  title = 'imgtobase64';
  myimage!: Observable<ImageBitmap> | string;
  base64code!: string;
 productsfinal: Product[] =[];
 ReadMore:boolean = true
 visible:boolean = false

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

  click2(): void {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }
 
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
    .subscribe(user => this.user = user)
    
    forkJoin({
      userproducts: this.userService.getuserproduct(id),
      products: this.userService.getallproducts()

    }).pipe(
      map(response => {
        const userproducts4: User_Product[] = response.userproducts
        const getallproducts4: Product[] = response.products
        let results: Product[] = [];
        

        for (let y = 0; y < getallproducts4.length; y++) {
          for (let x = 0; x < userproducts4.length; x++) {
            if (userproducts4[x].product_id === getallproducts4[y].id) {

              
                results.push(getallproducts4[y])
                
              
            }
          }        
        }
        return results;
        
        
            })
    ).subscribe(productsfinal => this.productsfinal = productsfinal)

      

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

