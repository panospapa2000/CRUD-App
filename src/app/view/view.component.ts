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
    this.getUsersFunction();
  }

  getUsersFunction() {
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

  updateUserFunction(element: UserModel) {
    this.dialog.open(UpdateComponent, {
      width: '250px', height: '700px', enterAnimationDuration: '1000ms', exitAnimationDuration: '1000ms', data: element
    }).afterClosed().subscribe(result => {
      const index = this.dataSource.data.findIndex( data => data.id === result.id);
      this.dataSource.data[index] = result;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  deleteUserFunction(id: number) {
    if (confirm("Are you sure you want to delete this user with ID " + id + "?")) {
      this.userService.deleteUser(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((u: UserModel) => u.id !== id);
      })
    }
  }
}