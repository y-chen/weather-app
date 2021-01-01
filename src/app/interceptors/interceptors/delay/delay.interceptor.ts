import { Observable, timer } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { environment } from '@wa/environments/environment';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
	constructor(private readonly loggerService: LoggerService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const isCallingTimeZoneDB: boolean = request.url.startsWith(environment.timeZoneDBAPI.url);
		const isCallingAskGeo: boolean = request.url.startsWith(environment.askGeoAPI.url);
		const ms = isCallingTimeZoneDB || isCallingAskGeo ? 10000 : 0;

		this.loggerService.debug(`Request url: ${request.url}, applying delay of ${ms} ms`);

		return next.handle(request).pipe(
			delay(ms),
			map((res) => res),
		);
		// return next.handle(request).pipe(tap((response) => console.log(response)));
		// return timer(ms).pipe(switchMap(() => next.handle(request)));
	}
}
