import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd, Data } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class ComponentService {
	private readonly subscriptions: Subscription[] = [];

	private localizationBasePath: string;
	private route: ActivatedRoute;
	private router?: Router;

	init(localizationBasePath: string, route?: ActivatedRoute, router?: Router) {
		this.localizationBasePath = localizationBasePath;
		this.router = router;
		this.route = route;

		if (this.router) {
			this.router.events
				.pipe(filter((e): e is RouterEvent => e instanceof RouterEvent))
				.subscribe((e: RouterEvent) => {
					if (e instanceof NavigationEnd) {
						this.unsubscribe();
					}
				});
		}
	}

	subscribe(subscription: Subscription): void {
		this.subscriptions.push(subscription);
	}

	unsubscribe(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	getResolverData(paramName: string): any {
		return this.route?.snapshot?.data[paramName];
	}

	getRouteData(paramName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				return this.route?.data?.subscribe((data: Data) => resolve(data[paramName]));
			} catch (error) {
				reject(error);
			}
		});
	}

	getLocalizationPath(end: string): string {
		return `${this.localizationBasePath}.${end}`;
	}
}
