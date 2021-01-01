import { Component, Input } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ViewWeather } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-basic-weather',
	templateUrl: './basic-weather.component.html',
	styleUrls: ['./basic-weather.component.scss'],
	providers: [ComponentService],
})
export class BasicWeatherComponent {
	@Input() viewData: ViewWeather;
}
