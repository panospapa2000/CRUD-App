import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../core/model/user';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../core/services/user.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { userFormGroup } from '../core/model/userFormGroup';
import { userFormValues } from '../core/model/userFormValues';
import { UserProductService } from '../core/services/user-product.service';
import {forkJoin,map} from 'rxjs'
import { UserProduct } from '../core/model/userProduct';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone','numProds', 'image','update','delete'];
  dataSource: MatTableDataSource<User>= new MatTableDataSource();

  constructor(private userService: UserService,public dialog:MatDialog,private userProductService:UserProductService) { 
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    forkJoin({
      users:this.userService.getUsers(),
      userProducts:this.userProductService.getUserProducts(),
    }).pipe(map((response)=>{
      const users:User[]=response.users;
      const userProducts:UserProduct[] = response.userProducts;
      for (let i =0 ;i<users.length; i++){

        let numOfProducts=0;

        for (let j=0 ; j<userProducts.length;j++ ){

          if(users[i].id===userProducts[j].user_id){
            numOfProducts++;
          }

          users[i].numProds=numOfProducts;
        }
        
      }
      console.log('Users t',users)
      return users;
    })).subscribe(element=>{
      console.log(element);
      this.dataSource = new MatTableDataSource<User>(element);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
   })

  }
   
    // this.userService.getUsers().subscribe(element=>{
    //   this.userData = element;
    //   this.dataSource = new MatTableDataSource<User>(this.userData);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  


  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  openCreateDialog() {
    this.dialog.open(CreateComponent, {
          width:'30%'
    }).afterClosed().subscribe(item=>{
     const lastIndex=this.dataSource.data.length;
     const newId = this.dataSource.data[lastIndex-1].id+1;
     item.id=newId;
     this.dataSource.data.push(item);
     this.dataSource.data = [...this.dataSource.data];
    });
  }


  deleteUser(user:User):void {
    console.log(user);
    this.userService.deleteUser(user.id).subscribe(
      {next:(res)=>{
        this.dataSource.data=this.dataSource.data.filter(u=> u !==user);
        alert("User deleted successfully!");},
    error:()=>{alert("Error while deleting user!");}
  });
  }



  openUpdateDialog(element :User) {
    this.dialog.open(UpdateComponent, {
          width:'30%',
          data:element,
    }).afterClosed().subscribe(item=>{
     const foundIndex=this.dataSource.data.indexOf(element);
      this.dataSource.data[foundIndex]=item;
      this.dataSource.data = [...this.dataSource.data];

    });
  }

  
}

  

