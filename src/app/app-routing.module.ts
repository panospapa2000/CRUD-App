import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './view-users/user-detail/user-detail.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { NotFoundComponent } from './core/not-found/not-found.component';



const routes: Routes = [
  { path: 'users', component: ViewUsersComponent }, 
{ path: 'dashboard', component: DashboardComponent },
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{path: 'users/detail/:id', component: UserDetailComponent},
{ path: 'delete', component: DeleteUserComponent },
{ path: 'addusers', component: AddUsersComponent },
{ path: 'search', component: UserSearchComponent },
{ path:'**', pathMatch: 'full',  component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
