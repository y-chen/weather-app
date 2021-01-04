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
		const { localizationBasePath, route, router } = params;
		this.localizationBasePath = localizationBasePath;
		this.route = route;
		this.router = router;

		if (this.router) {
			this.router.events.pipe(filter((e): e is RouterEvent => e instanceof RouterEvent)).subscribe((e: RouterEvent) => {
				if (e instanceof NavigationEnd) {
					this.unsubscribe();
				}
			});
		}
	}

	getLocalizationPath(end: string): string {
		return `${this.localizationBasePath}.${end}`;
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

	getRouteParam(paramName: string): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				return this.route?.params?.subscribe((data: Data) => resolve(data[paramName]));
			} catch (error) {
				reject(error);
			}
		});
	}

	subscribe(subscription: Subscription): void {
		this.subscriptions.push(subscription);
	}

	unsubscribe(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
