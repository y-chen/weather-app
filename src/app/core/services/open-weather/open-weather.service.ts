/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { Param } from '@wa/app/models/http.model';
import { Forecast, Weather } from '@wa/app/models/open-weather-parser.model';
import { OneCallResponse, OpenCoord, OpenWeatherSearchParams, Units } from '@wa/app/models/open-weather.model';

import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';
import { OpenWeatherParserService } from '../open-weather-parser/open-weather-parser.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class OpenWeatherService {
        private readonly URL: string;
        private readonly API_KEY: string;
        private readonly LEGACY_COORDS: Record<string, OpenCoord> = {
                '2643743': { lat: 51.5074, lon: -0.1278 }, // London
                '2950159': { lat: 52.52, lon: 13.405 }, // Berlin
                '3169070': { lat: 41.9028, lon: 12.4964 }, // Rome
                '2761369': { lat: 48.2082, lon: 16.3738 }, // Vienna
                '2988507': { lat: 48.8566, lon: 2.3522 }, // Paris
                '3117735': { lat: 40.4168, lon: -3.7038 }, // Madrid
        };

	constructor(
		private readonly api: ApiService,
		private readonly configService: ConfigService,
		private readonly openWeatherParserService: OpenWeatherParserService,
		private readonly settingsService: SettingsService,
	) {
		const { url, apiKey } = this.configService.config.openWeatherMap;
		this.URL = url;
		this.API_KEY = apiKey;
	}

        async getWeatherGroup(searchParams: OpenWeatherSearchParams): Promise<Weather[]> {
                const normalizedGroup = this.normalizeLocationKeys(searchParams.group);

                const weatherGroup: Weather[] = await Promise.all(
                        normalizedGroup.map(async (locationKey: string) => {
                                const coord = this.parseLocationKey(locationKey);

                                const response = await this.fetchOneCall(coord, ['minutely', 'hourly', 'daily', 'alerts']);

                                return await this.openWeatherParserService.parseCurrentWeatherFromOneCall(response, {
                                        iconSize: searchParams.iconSize,
                                        locationKey,
                                });
                        }),
                );

                return weatherGroup;
        }

        async getForecastById(searchParams: OpenWeatherSearchParams): Promise<Forecast> {
                const coord = this.parseLocationKey(searchParams.id);

                return await this.getForecastByCoord({ ...searchParams, coord });
        }

        async getForecastByCoord(searchParams: OpenWeatherSearchParams): Promise<Forecast> {
                const coord = searchParams.coord;
                const response = await this.fetchOneCall(coord, ['minutely', 'daily', 'alerts']);

                return await this.openWeatherParserService.parseOneCallForecast(response, searchParams.iconSize);
        }

        private appendParams(params: Param[] = []): Param[] {
                const unit: Units = this.settingsService.getUnit();

		return params.concat([
			{ key: 'lang', value: this.settingsService.getCulture().language },
			{ key: 'appid', value: this.API_KEY },
			{ key: 'units', value: unit.toLocaleLowerCase() },
		]);
	}

        private buildUrl(): string {
                return `${this.URL}/onecall`;
        }

        private async fetchOneCall(coord: OpenCoord, excludedSegments: string[] = []): Promise<OneCallResponse> {
                const url = this.buildUrl();
                let params: Param[] = [
                        { key: 'lat', value: coord.lat },
                        { key: 'lon', value: coord.lon },
                ];

                if (excludedSegments.length > 0) {
                        params.push({ key: 'exclude', value: excludedSegments.join(',') });
                }

                params = this.appendParams(params);

                return await this.api.get<OneCallResponse>(url, { params });
        }

        normalizeLocationKeys(keys: (string | number)[] = []): string[] {
                return keys
                        .map((key) => {
                                const locationKey = String(key);
                                const coord = this.parseLocationKey(locationKey);

                                if (!Number.isFinite(coord.lat) || !Number.isFinite(coord.lon)) {
                                        return null;
                                }

                                return `${coord.lat},${coord.lon}`;
                        })
                        .filter((value): value is string => value !== null);
        }

        private parseLocationKey(key: string): OpenCoord {
                if (!key) {
                        return { lat: Number.NaN, lon: Number.NaN };
                }

                if (key.includes(',')) {
                        const [lat, lon] = key.split(',').map((value: string) => Number(value));

                        return { lat, lon };
                }

                const legacyCoord = this.LEGACY_COORDS[key];

                if (legacyCoord) {
                        return legacyCoord;
                }

                return { lat: Number.NaN, lon: Number.NaN };
        }
}
