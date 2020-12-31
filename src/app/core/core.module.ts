import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	GroupForecastResolver
} from '@wa/app/core/resolvers/group-forecast/group-forecast.resolver';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { HereAuthService } from '@wa/app/core/services/here-auth/here-auth.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	exports: [],
	providers: [
		DatePipe,
		CultureService,
		LocalStorageService,
		NotificationService,
		LocationService,
		ApiService,
		LoggerService,
		GeoService,
		HereAuthService,
		OpenWeatherMapService,
		GroupForecastResolver,
		ErrorService,
		EventService,
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('You should import core module only in the root module');
		}
	}
}
