import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { PositionService } from '@wa/app/core/services/position/position.service';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { HereAuthService } from '@wa/app/core/services/here-auth/here-auth.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	exports: [],
	providers: [
		DatePipe,
		CultureService,
		LocalStorageService,
		NotificationService,
		PositionService,
		ApiService,
		LoggerService,
		GeoService,
		HereAuthService,
	],
})
export class CoreModule {}
