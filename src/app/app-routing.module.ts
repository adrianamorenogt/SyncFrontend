import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pb/home',
    pathMatch: 'full'
  }
];



export const AppRoutingModule = RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'});