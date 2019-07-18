import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// PLAYGROUND
import { PlaygroundComponent } from './playground/playground.component';
import { ClayComponent } from './clay/clay.component';
import { D3Component } from './d3/d3.component';
import { ThreeComponent } from './three/three.component';

// FALL OF FIAT
import { HomeComponent } from './home/home.component';
import { GrowthDistributionComponent } from './home/growth-distribution/growth-distribution.component';
import { MoneySupplyComponent } from './home/money-supply/money-supply.component';
import { IncomeShareComponent } from './home/income-share/income-share.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClayComponent,
    D3Component,
    ThreeComponent,
    PlaygroundComponent,
    GrowthDistributionComponent,
    MoneySupplyComponent,
    IncomeShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
