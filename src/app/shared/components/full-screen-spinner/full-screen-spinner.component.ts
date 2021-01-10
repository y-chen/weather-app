import { Component, Input } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
	selector: 'wa-full-screen-spinner',
	templateUrl: './full-screen-spinner.component.html',
	styleUrls: ['./full-screen-spinner.component.scss'],
})
export class FullScreenSpinnerComponent {
	@Input() message?: string;

	show = true;

	constructor(private readonly router: Router) {
		this.router.events.subscribe((routerEvent: RouterEvent) => {
			this.checkRouterEvent(routerEvent);
		});
	}

	checkRouterEvent(routerEvent: RouterEvent): void {
		if (routerEvent instanceof NavigationStart) {
			this.show = true;
		}

		if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
			this.show = false;
		}
	}
}
