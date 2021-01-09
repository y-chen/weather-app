/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { stringify } from 'flatted';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticEmailError, ErrorStack, HereError, OpenWeatherMapError } from '@wa/app/models/error.model';
import { Header } from '@wa/app/models/http.model';

@Injectable()
export class ErrorService {
	getClientMessage(error: Error): string {
		return error.message || stringify(error);
	}

	getClientStack(error: Error): string {
		return error.stack;
	}

	getServerMessage(e: HttpErrorResponse): string {
		const error = e.error;
		let message: string;

		if (this.isHereError(error)) {
			message = (error as HereError).error_description;
		}

		if (this.isOpenWeatherMapError(error)) {
			message = (error as OpenWeatherMapError).message;
		}

		if (this.isElasticEmailError(error)) {
			message = (error as ElasticEmailError).error;
		}

		return message || stringify(error);
	}

	getServerStack(e: HttpErrorResponse): ErrorStack {
		const { status, statusText, error, message, url, headers } = e;
		const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));

		return { status, statusText, error, message, url, headers: mappedHeaders };
	}

	private isHereError(error: any): boolean {
		return 'error' in error && 'error_description' in error;
	}

	private isOpenWeatherMapError(error: any): boolean {
		return 'cod' in error && 'message' in error;
	}

	private isElasticEmailError(error: any): boolean {
		return 'success' in error && 'error' in error;
	}
}
