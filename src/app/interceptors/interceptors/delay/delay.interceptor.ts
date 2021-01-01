import { from, Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { environment } from '@wa/environments/environment';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
	constructor(private readonly loggerService: LoggerService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const ms = request.url.startsWith(environment.timeZoneDBAPI.url) ? 1500 : 0;

		this.loggerService.debug(`Request url: ${request.url}, applying delay of ${ms} ms`);

		return from(new Promise((resolve) => setTimeout(resolve, ms))).pipe(
			delay(ms),
			switchMap(() => next.handle(request)),
		);
	}
}
