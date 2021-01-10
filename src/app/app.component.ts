import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { LocalizationPathKeys } from './common/constants';
import { ComponentService } from './core/services/component/component.service';
import { CultureService } from './core/services/culture/culture.service';
import { IComponent } from './models/component.model';

@Component({
	selector: 'wa-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ComponentService],
})
export class AppComponent implements IComponent {
	title = 'weather-app';

	showSpinner = true;

	constructor(
		private readonly componentService: ComponentService,
		private readonly cultureService: CultureService,
		private readonly router: Router,
	) {
		this.cultureService.init();
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.AppComponent });

		this.router.events.subscribe((routerEvent: RouterEvent) => {
			this.checkRouterEvent(routerEvent);
		});
	}

	checkRouterEvent(routerEvent: RouterEvent): void {
		if (routerEvent instanceof NavigationStart) {
			this.showSpinner = true;
		}

		if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
			this.showSpinner = false;
		}
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
