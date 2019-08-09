import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashComponent} from '../app/dash/dash.component'
import { Dash2Component } from './dash2/dash2.component';

const routes: Routes = [
  {path:'dash',
component:DashComponent},
{
  path:'dash2',
  component:Dash2Component
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
