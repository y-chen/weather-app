/* eslint-disable @typescript-eslint/naming-convention */

import { HttpHeaders } from '@angular/common/http';
import { ExtendedError, HereError, OpenWeatherMapError } from '@wa/app/models/error.model';

export interface ErrorServiceMocks {
	e: ExtendedError;
	init: any;
	hereError: HereError;
	openWeatherMapError: OpenWeatherMapError;
}

export const getErrorServiceMocks = (): ErrorServiceMocks => {
	let headers: HttpHeaders = new HttpHeaders();
	headers = headers.set('Key', 'Value');

	const hereError: HereError = {
		error: 'Here Error',
		error_description: 'Here Description',
	};

	const openWeatherMapError: OpenWeatherMapError = {
		cod: 500,
		message: 'OpenWeatherMap Message',
	};

	const init = { headers, status: 401, statusText: 'Unauthorized', url: 'http://example.com' };

	const e: ExtendedError = {
		name: 'ExtendedError',
		message: 'Error Message',
		stack: 'Client Stack',
	};

	return { e, init, hereError, openWeatherMapError };
};
