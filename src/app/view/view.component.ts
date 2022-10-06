import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { userModel } from '../Model/UserModel';
//import { subscribeOn } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.GetUsers();
  }
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  UserDetail: any;
  dataSource: any;

  GetUsers(){
    this.service.GetUsers().subscribe(item=>{
      this.UserDetail = item;
      this.dataSource = new MatTableDataSource<userModel>(this.UserDetail);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'image'];
}
