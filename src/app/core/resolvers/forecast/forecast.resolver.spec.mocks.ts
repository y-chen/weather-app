import { ActivatedRouteSnapshot } from '@angular/router';
import { IconSize, OpenCoord } from '@wa/app/models/open-weather.model';

export interface ForecastResolverMocks {
	coord: OpenCoord;
	iconSize: IconSize;
	id: number;
	route: ActivatedRouteSnapshot;
}

export const getForecastResolverMocks = (): ForecastResolverMocks => {
	const coord: OpenCoord = { lat: 1, lon: 1 };
	const iconSize: IconSize = 2;
	const id = 1;

	const route = new ActivatedRouteSnapshot();

	return { coord, iconSize, id, route };
};
