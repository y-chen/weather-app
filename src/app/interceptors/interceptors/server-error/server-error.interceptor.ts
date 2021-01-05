import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from '@wa/app/models/error.model';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			retry(1),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					// refresh token
				} else {
					switch (error.status) {
						case 400:
							return throwError(new BadRequestError(error));

						case 401:
							return throwError(new UnauthorizedError(error));

						case 403:
							return throwError(new ForbiddenError(error));

						case 404:
							return throwError(new NotFoundError(error));

						case 500:
							return throwError(new InternalServerError(error));

						default:
							return throwError(error);
					}
				}
			}),
		);
	}
}
