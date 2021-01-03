import { Component, Input } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { DayTimeWeather } from '@wa/app/models/open-weather-parser.model';
import { DayTime } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-day-time-weather',
	templateUrl: './day-time-weather.component.html',
	styleUrls: ['./day-time-weather.component.scss'],
	providers: [ComponentService],
})
export class DayTimeWeatherComponent implements IComponent {
	@Input() dayTimeName: DayTime;
	@Input() dayTimeWeather: DayTimeWeather;

	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: 'shared.dayTimeWeather' });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
