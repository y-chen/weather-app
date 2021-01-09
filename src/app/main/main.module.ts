import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@wa/app/shared/shared.module';

import { ForecastComponent } from './components/forecast/forecast.component';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { AboutMeComponent } from './components/about-me/about-me.component';

@NgModule({
	declarations: [ForecastComponent, HomeComponent, AboutMeComponent],
	imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
