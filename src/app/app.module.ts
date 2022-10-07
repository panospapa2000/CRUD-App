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
import { ViewUsersComponent } from './view-users/view-users.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { HeroSearchComponent } from './user-search/hero-search.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    ViewUsersComponent,
    HeroesComponent,
    MessagesComponent,
    DashboardComponent,
    HeroDetailComponent,
    DeleteUserComponent,
    HeroSearchComponent
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
    RouterModule.forRoot([
      { path: 'users', component: ViewUsersComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
