import { Component } from '@angular/core';

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

	constructor(private readonly componentService: ComponentService, private readonly cultureService: CultureService) {
		this.cultureService.init();
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.AppComponent });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
