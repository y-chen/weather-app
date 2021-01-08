import { mock, MockProxy } from 'jest-mock-extended';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Provider } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from '../core/services/api/api.service';
import { ComponentService } from '../core/services/component/component.service';
import { ConfigService } from '../core/services/config/config.service';
import { CultureService } from '../core/services/culture/culture.service';
import { ErrorService } from '../core/services/error/error.service';
import { EventService } from '../core/services/event/event.service';
import { HereService } from '../core/services/here/here.service';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { LocationService } from '../core/services/location/location.service';
import { LoggerService } from '../core/services/logger/logger.service';
import { NotificationService } from '../core/services/notification/notification.service';
import { OpenWeatherParserService } from '../core/services/open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from '../core/services/open-weather/open-weather.service';
import { SettingsService } from '../core/services/settings/settings.service';
import { SlackService } from '../core/services/slack/slack.service';
import { Config } from '../models/config.model';
import { Units } from '../models/open-weather.model';
import { getTestData, TestData } from './test-data';

export class MasterMock {
	angularFirestoreMock: MockProxy<AngularFirestore>;
	httpClientMock: MockProxy<HttpClient>;
	routerServiceMock: MockProxy<Router>;
	translateServiceMock: MockProxy<TranslateService>;

	apiServiceMock: MockProxy<ApiService>;
	componentServiceMock: MockProxy<ComponentService>;
	configServiceMock: MockProxy<ConfigService>;
	cultureServiceMock: MockProxy<CultureService>;
	errorServiceMock: MockProxy<ErrorService>;
	eventServiceMock: MockProxy<EventService>;
	hereServiceMock: MockProxy<HereService>;
	localStorageServiceMock: MockProxy<LocalStorageService>;
	locationServiceMock: MockProxy<LocationService>;
	loggerServiceMock: MockProxy<LoggerService>;
	notificationServiceMock: MockProxy<NotificationService>;
	openWeatherParserServiceMock: MockProxy<OpenWeatherParserService>;
	openWeatherServiceMock: MockProxy<OpenWeatherService>;
	settingsServiceMock: MockProxy<SettingsService>;
	slackServiceMock: MockProxy<SlackService>;

	angularFirestoreProvider: Provider;
	httpClientProvider: Provider;
	routerServiceProvider: Provider;
	translateServiceProvider: Provider;

	apiServiceProvider: Provider;
	componentServiceProvider: Provider;
	configServiceProvider: Provider;
	cultureServiceProvider: Provider;
	errorServiceProvider: Provider;
	eventServiceProvider: Provider;
	hereServiceProvider: Provider;
	localStorageServiceProvider: Provider;
	locationServiceProvider: Provider;
	loggerServiceProvider: Provider;
	notificationServiceProvider: Provider;
	openWeatherParserServiceProvider: Provider;
	openWeatherServiceProvider: Provider;
	settingsServiceProvider: Provider;
	slackServiceProvider: Provider;

	private readonly testData: TestData;

	constructor() {
		this.angularFirestoreMock = mock<AngularFirestore>();
		this.httpClientMock = mock<HttpClient>();
		this.routerServiceMock = mock<Router>();
		this.translateServiceMock = mock<TranslateService>();

		this.apiServiceMock = mock<ApiService>();
		this.componentServiceMock = mock<ComponentService>();
		this.configServiceMock = mock<ConfigService>();
		this.cultureServiceMock = mock<CultureService>();
		this.errorServiceMock = mock<ErrorService>();
		this.eventServiceMock = mock<EventService>();
		this.hereServiceMock = mock<HereService>();
		this.localStorageServiceMock = mock<LocalStorageService>();
		this.locationServiceMock = mock<LocationService>();
		this.loggerServiceMock = mock<LoggerService>();
		this.notificationServiceMock = mock<NotificationService>();
		this.openWeatherParserServiceMock = mock<OpenWeatherParserService>();
		this.openWeatherServiceMock = mock<OpenWeatherService>();
		this.settingsServiceMock = mock<SettingsService>();
		this.slackServiceMock = mock<SlackService>();

		this.angularFirestoreProvider = { provide: AngularFirestore, useValue: this.angularFirestoreMock };
		this.httpClientProvider = { provide: HttpClient, useValue: this.httpClientMock };
		this.routerServiceProvider = { provide: Router, useValue: this.routerServiceMock };
		this.translateServiceProvider = { provide: TranslateService, useValue: this.translateServiceMock };

		this.apiServiceProvider = { provide: ApiService, useValue: this.apiServiceMock };
		this.componentServiceProvider = { provide: ComponentService, useValue: this.componentServiceMock };
		this.configServiceProvider = { provide: ConfigService, useValue: this.configServiceMock };
		this.cultureServiceProvider = { provide: CultureService, useValue: this.cultureServiceMock };
		this.errorServiceProvider = { provide: ErrorService, useValue: this.errorServiceMock };
		this.eventServiceProvider = { provide: EventService, useValue: this.eventServiceMock };
		this.hereServiceProvider = { provide: HereService, useValue: this.hereServiceMock };
		this.localStorageServiceProvider = { provide: LocalStorageService, useValue: this.localStorageServiceMock };
		this.locationServiceProvider = { provide: LocationService, useValue: this.locationServiceMock };
		this.loggerServiceProvider = { provide: LoggerService, useValue: this.loggerServiceMock };
		this.notificationServiceProvider = { provide: NotificationService, useValue: this.notificationServiceMock };
		this.openWeatherParserServiceProvider = { provide: OpenWeatherParserService, useValue: this.openWeatherParserServiceMock };
		this.openWeatherServiceProvider = { provide: OpenWeatherService, useValue: this.openWeatherServiceMock };
		this.settingsServiceProvider = { provide: SettingsService, useValue: this.settingsServiceMock };
		this.slackServiceProvider = { provide: SlackService, useValue: this.slackServiceMock };

		this.testData = getTestData();
	}

	fixOnSettingsChange(): MasterMock {
		Object.defineProperty(this.eventServiceMock, 'onSettingsChange', {
			get: jest.fn(() => new EventEmitter()),
		});

		return this;
	}

	fixRouter(): MasterMock {
		const routerProps = ['events'];
		routerProps.forEach((prop) => {
			Object.defineProperty(this.routerServiceMock, prop, {
				get: jest.fn(() => new EventEmitter()),
			});
		});

		return this;
	}

	mockCultureWithEnglish(): MasterMock {
		this.settingsServiceMock.getCulture.mockReturnValue(this.testData.en);

		return this;
	}

	mockCultureWithItalian(): MasterMock {
		this.settingsServiceMock.getCulture.mockReturnValue(this.testData.it);

		return this;
	}

	mockCultures(): MasterMock {
		this.cultureServiceMock.getAvailableCultures.mockReturnValue(this.testData.cultures);

		return this;
	}

	mockConfig(): MasterMock {
		this.configServiceMock.getConfig.mockReturnValue(this.testData.config);
		this.angularFirestoreMock.collection.mockReturnValue((this.testData.config as unknown) as AngularFirestoreCollection<Config>);

		return this;
	}

	mockHttpClient(): MasterMock {
		const result: Observable<string> = of('foo.bar');

		this.httpClientMock.get.mockReturnValue(result);
		this.httpClientMock.post.mockReturnValue(result);
		this.httpClientMock.put.mockReturnValue(result);
		this.httpClientMock.patch.mockReturnValue(result);
		this.httpClientMock.delete.mockReturnValue(result);

		return this;
	}

	mockSettings(): MasterMock {
		this.settingsServiceMock.getCulture.mockReturnValue(this.testData.en);
		this.settingsServiceMock.getUnit.mockReturnValue(Units.Imperial);

		return this;
	}

	mockUnitWithMetric(): MasterMock {
		this.settingsServiceMock.getUnit.mockReturnValue(Units.Metric);

		return this;
	}

	mockUnitWithImperial(): MasterMock {
		this.settingsServiceMock.getUnit.mockReturnValue(Units.Imperial);

		return this;
	}
}
