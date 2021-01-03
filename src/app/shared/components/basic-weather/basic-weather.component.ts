import { Component, Input } from '@angular/core';
import { ViewWeather } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-basic-weather',
	templateUrl: './basic-weather.component.html',
	styleUrls: ['./basic-weather.component.scss'],
})
export class BasicWeatherComponent {
	@Input() viewData: ViewWeather;
}
