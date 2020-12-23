import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@wa/app/shared/shared.module';
import { HomeRoutingModule } from '@wa/app/features/home/home-routing.module';
import { HomeComponent } from '@wa/app/features/home/components/home/home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
