import Case from 'case';
import lodash from 'lodash';
import moment, { Moment } from 'moment';

import { Injectable } from '@angular/core';
import { HereLocation } from '@wa/app/models/here.model';
import { DayForecast, Forecast, ParserOptions, Weather } from '@wa/app/models/open-weather-parser.model';
import {
        DayTime,
        IconSize,
        OneCallResponse,
        OpenCoord,
        RawForecast,
        RawWeather,
        Units,
        WeatherGroup,
} from '@wa/app/models/open-weather.model';

import { CultureService } from '../culture/culture.service';
import { HereService } from '../here/here.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class OpenWeatherParserService {
	constructor(
		private readonly cultureService: CultureService,
		private readonly hereService: HereService,
		private readonly settingsService: SettingsService,
	) {}

        parseWeatherData(weather: RawWeather, options: ParserOptions = {}): Weather {
                const { iconSize, titleOverride, timezone, locationKey } = options;
                const temperatureUnit: string = this.getTemperatureUnit();

                const { id, name, dt } = weather;
                const { description, icon } = weather.weather[0];
                const coord = weather.coord;
                const weatherId = locationKey || (coord ? this.buildLocationKey(coord) : String(id ?? ''));

                return {
                        id: weatherId,
                        title: titleOverride || name,
                        time: this.cultureService.convertUnixTimeToLocaleDate(dt, timezone || weather.sys.timezone),
                        description: Case.capital(description),
                        temperature: `${Math.round(weather.main.temp)}° ${temperatureUnit}`,
                        icon: `https://openweathermap.org/img/wn/${icon}@${iconSize || 4}x.png`,
                        coord,
                };
        }

        async parseForecastData(
                forecast: RawForecast,
                iconSize: IconSize = 4,
                options: ParserOptions = {},
        ): Promise<Forecast> {
                const { coord, timezone } = forecast.city;
                const location: HereLocation = await this.hereService.locationLookup({ coord, query: forecast.city.name });
                const { city, countryCode } = location.address;
                const name = `${city}, ${countryCode}`;
                const locationKey = options.locationKey || this.buildLocationKey(coord);

                const startOfDay = this.startOfDayFunction(timezone);
                const groupByDayTime = this.groupByDayTimeFunction(timezone);

                const days: DayForecast[] = lodash
			.chain(forecast.list)
			.groupBy(startOfDay)
			.mapValues((dayWeathers: RawWeather[], day: string) => {
				const dayTimes = lodash
					.chain(dayWeathers)
					.groupBy(groupByDayTime)
					.mapValues((dayTimeWeathers: RawWeather[]) =>
						lodash.map(dayTimeWeathers, (weather: RawWeather) => {
							const titleOverride: string = this.cultureService.convertUnixTimeToLocaleDate(weather.dt, timezone);

                                                        return this.parseWeatherData(weather, {
                                                                iconSize,
                                                                titleOverride,
                                                                timezone,
                                                                locationKey,
                                                        });
                                                }),
                                        )
                                        .value();

                                return { day, ...dayTimes };
                        })
                        .map((value) => value)
                        .value();

                return { id: locationKey, name, coord, days };
        }

        async translateLocationNames(weatherGroup: WeatherGroup): Promise<void> {
                for (const weather of weatherGroup.list) {
                        const location = await this.hereService.findLocationByCoords(weather.coord);
			const { city, countryCode } = location.address;

			weather.name = `${city}, ${countryCode}`;
        }

        async parseCurrentWeatherFromOneCall(oneCall: OneCallResponse, options: ParserOptions = {}): Promise<Weather> {
                const coord = { lat: oneCall.lat, lon: oneCall.lon };
                const location = await this.hereService.findLocationByCoords(coord);
                const { city, countryCode } = location.address;
                const title = `${city}, ${countryCode}`;
                const locationKey = options.locationKey || this.buildLocationKey(coord);

                const rawWeather: RawWeather = {
                        id: locationKey,
                        name: title,
                        coord,
                        weather: oneCall.current.weather,
                        main: {
                                temp: oneCall.current.temp,
                                feels_like: oneCall.current.feels_like,
                                temp_min: oneCall.current.temp,
                                temp_max: oneCall.current.temp,
                                pressure: oneCall.current.pressure,
                                humidity: oneCall.current.humidity,
                        },
                        visibility: oneCall.current.visibility ?? 0,
                        wind:
                                oneCall.current.wind_speed !== undefined
                                        ? { speed: oneCall.current.wind_speed, deg: oneCall.current.wind_deg ?? 0 }
                                        : undefined,
                        clouds: { all: oneCall.current.clouds },
                        dt: oneCall.current.dt,
                        sys: {
                                country: countryCode,
                                sunrise: oneCall.current.sunrise,
                                sunset: oneCall.current.sunset,
                                timezone: oneCall.timezone_offset,
                        },
                };

                return this.parseWeatherData(rawWeather, {
                        ...options,
                        titleOverride: options.titleOverride || title,
                        timezone: oneCall.timezone_offset,
                        locationKey,
                });
        }

        async parseOneCallForecast(oneCall: OneCallResponse, iconSize: IconSize = 4): Promise<Forecast> {
                const coord = { lat: oneCall.lat, lon: oneCall.lon };
                const location = await this.hereService.findLocationByCoords(coord);
                const { city, countryCode } = location.address;
                const locationName = `${city}, ${countryCode}`;
                const rawForecast: RawForecast = {
                        cod: '200',
                        message: 0,
                        cnt: oneCall.hourly?.length || 0,
                        list:
                                oneCall.hourly?.map((hour) => ({
                                        coord,
                                        weather: hour.weather,
                                        main: {
                                                temp: hour.temp,
                                                feels_like: hour.feels_like,
                                                temp_min: hour.temp,
                                                temp_max: hour.temp,
                                                pressure: hour.pressure,
                                                humidity: hour.humidity,
                                        },
                                        visibility: hour.visibility ?? 0,
                                        wind:
                                                hour.wind_speed !== undefined
                                                        ? { speed: hour.wind_speed, deg: hour.wind_deg ?? 0 }
                                                        : undefined,
                                        clouds: { all: hour.clouds },
                                        dt: hour.dt,
                                        sys: {
                                                timezone: oneCall.timezone_offset,
                                                sunrise: oneCall.current.sunrise,
                                                sunset: oneCall.current.sunset,
                                        },
                                        pop: hour.pop,
                                        rain: hour.rain,
                                        snow: hour.snow,
                                })) || [],
                        city: {
                                id: this.buildLocationKey(coord),
                                name: locationName,
                                coord,
                                country: countryCode,
                                population: undefined,
                                timezone: oneCall.timezone_offset,
                                sunrise: oneCall.current.sunrise,
                                sunset: oneCall.current.sunset,
                        },
                };

                return this.parseForecastData(rawForecast, iconSize, {
                        locationKey: this.buildLocationKey(coord),
                });
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

        private buildLocationKey(coord?: OpenCoord): string {
                if (!coord) {
                        return '';
                }

                return `${coord.lat},${coord.lon}`;
        }
}
