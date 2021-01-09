import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ForecastResolver } from './resolvers/forecast/forecast.resolver';
import { ProfileResolver } from './resolvers/profile/profile.resolver';
import { WeatherGroupResolver } from './resolvers/weather-group/weather-group.resolver';
import { ApiService } from './services/api/api.service';
import { ConfigService } from './services/config/config.service';
import { CultureService } from './services/culture/culture.service';
import { ElasticEmailService } from './services/elastic-email/elastic-email.service';
import { ErrorService } from './services/error/error.service';
import { EventService } from './services/event/event.service';
import { HereService } from './services/here/here.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { LocationService } from './services/location/location.service';
import { LoggerService } from './services/logger/logger.service';
import { NotificationService } from './services/notification/notification.service';
import { OpenWeatherParserService } from './services/open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from './services/open-weather/open-weather.service';
import { ProfileService } from './services/profile/profile.service';
import { SettingsService } from './services/settings/settings.service';
import { SlackService } from './services/slack/slack.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	exports: [],
	providers: [
		ApiService,
		ConfigService,
		CultureService,
		DatePipe,
		ElasticEmailService,
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
		ProfileResolver,
		ProfileService,
		SettingsService,
		SlackService,
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
