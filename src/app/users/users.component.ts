import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../user';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'image'];
  userData: User[]=[];
  dataSource: MatTableDataSource<User>= new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

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

}
