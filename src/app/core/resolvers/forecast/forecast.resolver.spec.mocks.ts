import { ActivatedRouteSnapshot } from '@angular/router';
import { Coord, IconSize } from '@wa/app/models/open-weather.model';

export interface ForecastResolverMocks {
	coord: Coord;
	iconSize: IconSize;
	id: number;
	route: ActivatedRouteSnapshot;
}

export const getForecastResolverMocks = (): ForecastResolverMocks => {
	const coord: Coord = { lat: 1, lon: 1 };
	const iconSize: IconSize = 2;
	const id = 1;

	const route = new ActivatedRouteSnapshot();

	return { coord, iconSize, id, route };
};
