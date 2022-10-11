import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddUsersComponent } from './add-users/add-users.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/in-memory-data.service';
import { ViewUsersComponent } from './view-users/view-users.component';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MessagesComponent } from './shared/messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './view-users/user-detail/user-detail.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UserSearchComponent } from './user-search/user-search.component';
import {MatListModule} from '@angular/material/list';
import { CoreComponent } from './core/core.component';
import { SharedComponent } from './shared/shared.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ModelsComponent } from './core/models/models.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    AddUsersComponent,
    ViewUsersComponent,
    MessagesComponent,
    DashboardComponent,
    UserDetailComponent,
    DeleteUserComponent,
    UserSearchComponent,
    CoreComponent,
    SharedComponent,
    NotFoundComponent,
    ModelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatPaginatorModule,
    RouterModule.forRoot([    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
