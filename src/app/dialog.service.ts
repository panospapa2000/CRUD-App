import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string)
  {
    return this.dialog.open(MatConfirmDialogComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message : msg
      }
    });
  }
}
