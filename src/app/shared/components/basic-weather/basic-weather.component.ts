import { Component, Input } from '@angular/core';
import { Weather } from '@wa/app/models/open-weather-parser.model';

@Component({
	selector: 'wa-basic-weather',
	templateUrl: './basic-weather.component.html',
	styleUrls: ['./basic-weather.component.scss'],
})
export class BasicWeatherComponent {
	@Input() weather: Weather;
}
