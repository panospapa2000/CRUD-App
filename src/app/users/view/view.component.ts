import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../../core/Model/userModel';
import { UserService } from '../../core/services/user.service';
import { UserProductsService } from '../../core/services/user-products.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../core/services/mat-dialog.service';
import { forkJoin, map } from 'rxjs';
import { UserProducts } from 'src/app/core/Model/userProducts';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductModel } from 'src/app/core/Model/productModel';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'image',
    'products',
    'update',
    'delete',
  ];

  constructor(
    private userService: UserService,
    private userProducts: UserProductsService,
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUsersFunction();
  }

  getUsersFunction() {
    forkJoin({
      users: this.userService.getUsers(),
      user_products: this.userProducts.getUserProducts(),
      products: this.productService.getProducts(),
    })
      .pipe(
        map((response) => {
          const userDetail: UserModel[] = response.users;
          const userProduct: UserProducts[] = response.user_products;
          const products: ProductModel[] = response.products;
          console.log(
            '🚀 ~ file: view.component.ts ~ line 65 ~ ViewComponent ~ map ~ products',
            products
          );

          // for (let i = 0; i < userDetail.length; i++) {
          //   // let numberOfProducts = 0;
          //   const tempProducts: ProductModel[] = [];

          //   for (let y = 0; y < userProduct.length; y++) {
          //     if (userDetail[i].id === userProduct[y].user_id) {
          //       const foundProduct = products.find(
          //         (product) => product.id === userProduct[y].product_id
          //       );

          //       if (foundProduct) {
          //         tempProducts.push(foundProduct);
          //       }

          //       // numberOfProducts++;
          //     }
          //   }

          //   // userDetail[i].numberOfProducts = numberOfProducts;

          //   userDetail[i].products = tempProducts;
          // }

          return userDetail.map((user) => ({
            ...user,
            products: products.filter(({ id }) =>
              userProduct.some(
                ({ product_id, user_id }) =>
                  product_id === id && user_id === user.id
              )
            ),
            numberOfProducts: userProduct.filter(
              ({ user_id }) => user_id === user.id
            ).length,
          }));

          // return userDetail;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<UserModel>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getProductsOfUser(
    userId: number,
    products: ProductModel[],
    userProduct: UserProducts[]
  ) {
    return products.filter((product) =>
      userProduct.some(
        (pr) => pr.product_id === product.id && pr.user_id === userId
      )
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('sorted${sortState.direction}ending');
    } else {
      this._liveAnnouncer.announce('sorting cleared');
    }
  }

  filterBar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProductsTitles(products: ProductModel[]) {
    console.log(products.map((product) => product.title));
    return products.map((product) => product.title).join(', ');
  }

  updateUserFunction(element: UserModel) {
    this.dialog
      .open(UpdateComponent, {
        width: '250px',
        height: '725px',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: element,
      })
      .afterClosed()
      .subscribe((result) => {
        const index = this.dataSource.data.findIndex(
          (data) => data.id === result.id
        );
        this.dataSource.data[index] = result;
        this.dataSource.data = [...this.dataSource.data];
      });
  }

  deleteUserFunction(id: number) {
    this.dialogService
      .openConfirmDialog('Proceed with the user(ID:' + id + ') deletion?')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.deleteUser(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: UserModel) => u.id !== id
            );
            this.snackBar.open(
              'This user has been successfully deleted!!!',
              'Okay',
              { verticalPosition: 'top', duration: 3000 }
            );
          });
        }
      });
  }
}
