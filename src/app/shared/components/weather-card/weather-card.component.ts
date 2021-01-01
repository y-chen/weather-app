import { Component, Input } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { ViewWeather } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-weather-card',
	templateUrl: './weather-card.component.html',
	styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements IComponent {
	@Input() viewData: ViewWeather;
	@Input() title?: string;
	@Input() subtitle?: string;
	@Input() iconSize?: 2 | 4;

	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: 'shared.basicWeather' });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
