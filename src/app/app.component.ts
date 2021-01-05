import { Component } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

@Component({
	selector: 'wa-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'weather-app';

	constructor(private readonly cultureService: CultureService) {
		this.cultureService.init();
	}
}
