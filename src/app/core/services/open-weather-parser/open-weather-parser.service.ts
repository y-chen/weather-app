import Case from 'case';
import * as lodash from 'lodash';
import moment, { Moment } from 'moment';

import { Injectable } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { HereLocation } from '@wa/app/models/here.model';
import { DayForecast, DayForecastPromise, Forecast, ParserOptions, Weather } from '@wa/app/models/open-weather-parser.model';
import { DayTime, IconSize, RawForecast, RawWeather, Units, WeatherGroup } from '@wa/app/models/open-weather.model';

import { SettingsService } from '../settings/settings.service';

@Injectable()
export class OpenWeatherParserService {
	constructor(
		private readonly cultureService: CultureService,
		private readonly geoService: GeoService,
		private readonly settingsService: SettingsService,
	) {}

	parseWeatherData(weather: RawWeather, options: ParserOptions = {}): Weather {
		const { iconSize, titleOverride, timezone } = options;
		const temperatureUnit: string = this.getTemperatureUnit();

		const { id, name, dt } = weather;
		const { description, icon } = weather.weather[0];

		return {
			id,
			title: titleOverride || name,
			time: this.cultureService.convertUnixTimeToLocaleDate(dt, timezone || weather.sys.timezone),
			description: Case.capital(description),
			temperature: `${Math.round(weather.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${icon}@${iconSize || 4}x.png`,
		};
	}

	async parseForecastData(forecast: RawForecast, iconSize: IconSize = 4): Promise<Forecast> {
		const { id, coord, timezone } = forecast.city;
		const location: HereLocation = await this.geoService.locationLookup({ coord, query: forecast.city.name });
		const { city, countryCode } = location.address;
		const name = `${city}, ${countryCode}`;

		const startOfDay = this.startOfDayFunction(timezone);
		const groupByDayTime = this.groupByDayTimeFunction(timezone);

		const promises: Promise<DayForecast>[] = lodash
			.chain(forecast.list)
			.groupBy(startOfDay)
			.mapValues((dayWeathers: RawWeather[], day: string) => {
				const dayTimes = lodash
					.chain(dayWeathers)
					.groupBy(groupByDayTime)
					.mapValues(async (dayTimeWeathers: RawWeather[]) => {
						const dayTimeWeatherPromises = lodash.map(dayTimeWeathers, async (weather: RawWeather) => {
							const date: string = this.cultureService.convertUnixTimeToLocaleDate(weather.dt, timezone);
							const titleOverride: string = await this.cultureService.getTranslation('shared.basicWeather.date', { date });

							return this.parseWeatherData(weather, { iconSize, titleOverride, timezone });
						});

						return await Promise.all(dayTimeWeatherPromises);
					})
					.value();

				return { day, ...dayTimes };
			})
			.map((value) => value)
			.map(async (value: DayForecastPromise) => ({
				day: value.day,
				night: await value.night,
				morning: await value.morning,
				afternoon: await value.afternoon,
				evening: await value.evening,
			}))
			.value();

		const days = await Promise.all(promises);

		return { id, name, coord, days };
	}

	async translateLocationNames(weatherGroup: WeatherGroup): Promise<void> {
		for (const weather of weatherGroup.list) {
			const location = await this.geoService.findLocationByCoords(weather.coord);
			const { city, countryCode } = location.address;

			weather.name = `${city}, ${countryCode}`;
		}
	}

	private groupByDayTimeFunction(timezone: number): (weather: RawWeather) => DayTime {
		return (weather: RawWeather): DayTime => {
			const hour = moment((weather.dt + timezone || 0) * 1000).hour();

			if (hour < 6) {
				return 'night';
			}
			if (hour >= 6 && hour < 12) {
				return 'morning';
			}
			if (hour >= 12 && hour < 18) {
				return 'afternoon';
			}
			if (hour >= 18) {
				return 'evening';
			}
		};
	}

	private startOfDayFunction(timezone: number): (weather: RawWeather) => Moment {
		return (weather: RawWeather): Moment => moment((weather.dt + timezone || 0) * 1000).startOf('day');
	}

	private getTemperatureUnit(): string {
		const unit: Units = this.settingsService.getUnit();

		switch (unit) {
			case Units.Metric:
				return 'C';
			case Units.Imperial:
				return 'F';
			default:
				break;
		}
	}
}
