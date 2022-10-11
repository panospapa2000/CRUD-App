import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "create", component: CreateComponent },
  {
    path: "view", component: ViewComponent,
    children: [
      {path:"update/:id", component: UpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
