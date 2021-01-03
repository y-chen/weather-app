import { Observable } from 'rxjs';

import {
	HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@wa/app/interceptors/services/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(private readonly loaderService: LoaderService) {}

	removeRequest(req: HttpRequest<any>): void {
		const i = this.requests.indexOf(req);

		if (i >= 0) {
			this.requests.splice(i, 1);
		}

		setTimeout(() => this.loaderService.isLoading.next(this.requests.length > 0));
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.requests.push(req);
		setTimeout(() => this.loaderService.isLoading.next(true));

		return new Observable<HttpEvent<any>>((observer) => {
			const subscription = next.handle(req).subscribe(
				(event) => {
					if (event instanceof HttpResponse) {
						this.removeRequest(req);
						observer.next(event);
					}
				},
				(err) => {
					this.removeRequest(req);
					observer.error(err);
				},
				() => {
					this.removeRequest(req);
					observer.complete();
				},
			);

			return () => {
				this.removeRequest(req);
				subscription.unsubscribe();
			};
		});
	}
}
