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
import { HomeComponent } from './fallOfFiat/fallOfFiat.component';
import { GrowthDistributionComponent } from './fallOfFiat/growth-distribution/growth-distribution.component';
import { MoneySupplyComponent } from './fallOfFiat/money-supply/money-supply.component';
import { IncomeShareComponent } from './fallOfFiat/income-share/income-share.component';
import { TheStormComponent } from './fallOfFiat/the-storm/the-storm.component';
import { OverviewComponent } from './fallOfFiat/overview/overview.component';

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
    IncomeShareComponent,
    TheStormComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
