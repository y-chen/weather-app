import { ActivatedRouteSnapshot } from '@angular/router';

export interface WeatherGroupResolverMocks {
	defaultCities: number[];
	storedFavouriteCities: string;
	route: ActivatedRouteSnapshot;
}

export const getWeatherGroupResolverMocks = (): WeatherGroupResolverMocks => {
	const defaultCities: number[] = [1, 2];
	const storedFavouriteCities = '[3,4]';

	const route = new ActivatedRouteSnapshot();

	return { defaultCities, storedFavouriteCities, route };
};
