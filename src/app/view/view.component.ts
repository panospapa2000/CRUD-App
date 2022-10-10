import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../Model/userModel';
import { UserService } from '../user.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  userDetail: UserModel[] = [];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'image', 'update', 'delete'];

  constructor(private userService: UserService, private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(item => {
      this.userDetail = item;
      this.dataSource = new MatTableDataSource<UserModel>(this.userDetail);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('sorted${sortState.direction}ending')
    } else {
      this._liveAnnouncer.announce('sorting cleared');
    }
  }

  filterBar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  updateUserFunction(id: number) {
    this.dialog.open(UpdateComponent, {
      width: '250px', height: '600px', enterAnimationDuration: '1000ms', exitAnimationDuration: '1000ms',
    })
  }

  deleteUserFunction(id: number) {
    if (confirm("Are you sure you want to delete this user with ID " + id + "?")) {
      this.userService.deleteUser(id).subscribe(item => {
        this.getUsers();
        window.alert("This user has been deleted");
      })
    }
  }
}