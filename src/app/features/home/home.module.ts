import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForecastComponent } from '@wa/app/features/home/components/forecast/forecast.component';
import { HomeComponent } from '@wa/app/features/home/components/home/home.component';
import { HomeRoutingModule } from '@wa/app/features/home/home-routing.module';
import { SharedModule } from '@wa/app/shared/shared.module';

@NgModule({
	declarations: [HomeComponent, ForecastComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
