import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ThreeComponent } from './three/three.component';
import { ClayComponent } from './clay/clay.component';
import { D3Component } from './d3/d3.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'thefalloffiat',
    pathMatch: 'full'
  },
  {
    path: 'thefalloffiat',
    component: HomeComponent
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    children: [
      { path: '', redirectTo: 'three', pathMatch: 'full' },
      {
        path: 'three',
        component: ThreeComponent,
      },
      {
        path: 'claygl',
        component: ClayComponent,
      },
      {
        path: 'd3',
        component: D3Component,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
