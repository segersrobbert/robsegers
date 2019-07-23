import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ThreeComponent } from './three/three.component';
import { ClayComponent } from './clay/clay.component';
import { D3Component } from './d3/d3.component';
import { GrowthDistributionComponent } from './home/growth-distribution/growth-distribution.component';
import { MoneySupplyComponent } from './home/money-supply/money-supply.component';
import { IncomeShareComponent } from './home/income-share/income-share.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'thefalloffiat/growthDistribution',
    pathMatch: 'full'
  },
  {
    path: 'thefalloffiat',
    redirectTo: 'thefalloffiat/growthDistribution',
    pathMatch: 'full'
  },
  {
    path: 'thefalloffiat',
    component: HomeComponent,
    children: [
      {
        path: 'growthDistribution',
        component: GrowthDistributionComponent,
      },
      {
        path: 'moneysupply',
        component: MoneySupplyComponent,
      },
      {
        path: 'incomeShare',
        component: IncomeShareComponent,
      }
    ]
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
