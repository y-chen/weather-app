/* eslint-disable @typescript-eslint/naming-convention */

import { HttpErrorResponse } from '@angular/common/http';

import { Header } from './http.model';

export interface ErrorStack {
	status: number;
	statusText: string;
	error: HereError | OpenWeatherMapError;
	message: string;
	url: string;
	headers: Header[];
}

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

export interface ElasticEmailError {
	success: boolean;
	error: string;
}
