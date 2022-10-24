import { NgModule } from '@angular/core';
//declarations
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './users/view/view.component';
import { CreateComponent } from './users/create/create.component';
import { UpdateComponent } from './users/update/update.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
//imports
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MakeBold } from './core/pipes/bold.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    CreateComponent,
    UpdateComponent,
    MatConfirmDialogComponent,
    MakeBold
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    //Angular Material
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule, 
    MatFormFieldModule,
    MatSortModule, 
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
