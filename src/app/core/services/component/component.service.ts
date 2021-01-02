/* eslint-disable security/detect-object-injection */

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ComponentParams } from '@wa/app/models/component.model';

@Injectable()
export class ComponentService {
	private readonly subscriptions: Subscription[] = [];

	private localizationBasePath?: string;
	private route?: ActivatedRoute;
	private router?: Router;

	init(params: ComponentParams): void {
		const { localizationBasePath, router, route } = params;
		this.localizationBasePath = localizationBasePath;
		this.router = router;
		this.route = route;

		if (this.router) {
			this.router.events.pipe(filter((e): e is RouterEvent => e instanceof RouterEvent)).subscribe((e: RouterEvent) => {
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

	getResolverData(paramName: string): unknown {
		return this.route?.snapshot?.data[paramName];
	}

	getRouteData(paramName: string): Promise<unknown> {
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
