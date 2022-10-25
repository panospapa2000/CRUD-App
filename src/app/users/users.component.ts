import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../core/model/user';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../core/services/user.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';
import { AddToTableService} from 'src/app/core/services/add-to-table.service';
import { Subscription } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'image','update','delete'];
  userData: User[]=[];
  dataSource: MatTableDataSource<User>= new MatTableDataSource();

  constructor(private userService: UserService,public dialog:MatDialog,private addToTableService: AddToTableService) { 
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(element=>{
      this.userData = element;
      this.dataSource = new MatTableDataSource<User>(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
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

  openUpdateDialog(element :any) {
    this.dialog.open(UpdateComponent, {
          width:'30%',
          data:element,
    }).afterClosed().subscribe(item=>{
      // console.log(item);
     const foundIndex=this.dataSource.data.findIndex(x=>item.id===element.id);
      this.dataSource.data[foundIndex]=item;
      this.dataSource.data = [...this.dataSource.data];

    });
  }

  
}

  

