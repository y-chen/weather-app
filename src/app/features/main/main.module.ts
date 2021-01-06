import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForecastComponent } from '@wa/app/features/main/components/forecast/forecast.component';
import { HomeComponent } from '@wa/app/features/main/components/home/home.component';
import { MainRoutingModule } from '@wa/app/features/main/main-routing.module';
import { SharedModule } from '@wa/app/shared/shared.module';

@NgModule({
	declarations: [HomeComponent, ForecastComponent],
	imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
