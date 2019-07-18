import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClayComponent } from './clay/clay.component';
import { D3Component } from './d3/d3.component';
import { ThreeComponent } from './three/three.component';
import { PlaygroundComponent } from './playground/playground.component';
import { GrowthDistributionComponent } from './home/growth-distribution/growth-distribution.component';
import { MoneySupplyComponent } from './home/money-supply/money-supply.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClayComponent,
    D3Component,
    ThreeComponent,
    PlaygroundComponent,
    GrowthDistributionComponent,
    MoneySupplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
