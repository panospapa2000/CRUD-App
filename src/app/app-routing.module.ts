import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes :Routes =[{ path: '', redirectTo: '/users', pathMatch: 'full' },{path:'users',component:UsersComponent}]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
