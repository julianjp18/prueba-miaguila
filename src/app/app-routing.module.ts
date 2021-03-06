import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path:'destiny',
    redirectTo: 'home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
