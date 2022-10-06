import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../Model/UserModel';
import { subscribeOn } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  userDetail: UserModel[] = [];
  dataSource: MatTableDataSource<UserModel>= new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'image', 'update', 'delete'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(item=>{
      this.userDetail = item;
      this.dataSource = new MatTableDataSource<UserModel>(this.userDetail);
      this.dataSource.paginator = this.paginator;
    });
  }


  updateUserFunction(id:any){

  }

  deleteUserFunction(id:any){
    this.userService.deleteUser(id).subscribe(item=>{
      this.getUsers();
      window.alert("This user has been deleted");
    })
  }
}
