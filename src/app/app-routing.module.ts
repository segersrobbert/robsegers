import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClayComponent } from './clay/clay.component';
import { D3Component } from './d3/d3.component';
import { ThreeComponent } from './three/three.component';

const routes: Routes = [
  {
    path: 'three',
    component: ThreeComponent
  },
  {
    path: 'D3',
    component: D3Component
  },
  {
    path: 'clay',
    component: ClayComponent
  },
  {
    path: 'default-state',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
