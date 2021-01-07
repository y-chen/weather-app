import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastResolver } from '@wa/app/core/resolvers/forecast/forecast.resolver';
import { WeatherGroupResolver } from '@wa/app/core/resolvers/weather-group/weather-group.resolver';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { HereService } from '@wa/app/core/services/here/here.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { OpenWeatherParserService } from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	exports: [],
	providers: [
		ApiService,
		ConfigService,
		CultureService,
		DatePipe,
		ErrorService,
		EventService,
		ForecastResolver,
		HereService,
		LocalStorageService,
		LocationService,
		LoggerService,
		NotificationService,
		OpenWeatherParserService,
		OpenWeatherService,
		SettingsService,
		WeatherGroupResolver,
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('You should import core module only in the root module');
		}
	}
}
