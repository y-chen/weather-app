import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { environment } from '@wa/environments/environment';

@Injectable()
export class LoggerService {
	constructor(private datePipe: DatePipe) {}

	debug(message: any, ...args: any[]): void {
		if (!environment.production) {
			// tslint:disable-next-line: no-console
			this.log(console.debug, message, args);
		}
	}

	info(message: any, ...args: any[]): void {
		// tslint:disable-next-line: no-console
		this.log(console.info, message, args);
	}

	warn(message: any, ...args: any[]): void {
		this.log(console.warn, message, args);
	}

	error(message: any, ...args: any[]): void {
		this.log(console.error, message, args);
	}

	private log(callbak: Function, message?: any, ...args: any[]) {
		message = this.prefixMessage(message);

		if (Array.isArray(args) && args.length > 0) {
			callbak(message, ...args);
		} else {
			callbak(message, args);
		}
	}

	private prefixMessage(message): string {
		return `WA | ${this.datePipe.transform(new Date(), 'HH:mm:ss.SSS')} | ${message}`;
	}
}
