import { Component } from '@angular/core';
import {
	NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent
} from '@angular/router';
import { EventService } from '@wa/app/core/services/event/event.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { LoaderService } from '@wa/app/interceptors/services/loader/loader.service';
import { LoadingInfo } from '@wa/app/models/loading-info.model';

@Component({
	selector: 'cvm-overlay-spinner',
	templateUrl: './overlay-spinner.component.html',
	styleUrls: ['./overlay-spinner.component.scss'],
})
export class OverlaySpinnerComponent {
	loading: boolean;

	constructor(
		private readonly router: Router,
		private readonly eventService: EventService,
		private readonly loggerService: LoggerService,
		readonly loaderService: LoaderService,
	) {
		this.router.events.subscribe((routerEvent: RouterEvent) => {
			this.checkRouterEvent(routerEvent);
		});

		this.eventService.onLoading.subscribe((info: LoadingInfo) => {
			this.loggerService.info('Loading info received', info);

			this.loading = info.command;
		});
	}

	checkRouterEvent(routerEvent: RouterEvent): void {
		if (routerEvent instanceof NavigationStart) {
			setTimeout(() => (this.loading = true));
		}

		if (
			routerEvent instanceof NavigationEnd ||
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError
		) {
			setTimeout(() => (this.loading = false));
		}
	}
}
