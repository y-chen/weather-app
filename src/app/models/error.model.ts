/* eslint-disable @typescript-eslint/naming-convention */

import { HttpErrorResponse } from '@angular/common/http';

export interface ExtendedError extends Error {
	message: string;
	stack: string;
	rejection?: HttpErrorResponse;
}

export interface HereError {
	error: string;
	error_description: string;
}

export interface OpenWeatherMapError {
	cod: number;
	message: string;
}
