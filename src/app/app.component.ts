import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'wa-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'weather-app';

	constructor(private readonly translate: TranslateService) {
		this.translate.setDefaultLang('en');
	}
}
