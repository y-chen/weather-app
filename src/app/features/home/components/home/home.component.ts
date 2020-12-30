import { Component, OnInit } from '@angular/core';

import { ForecastGroup } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	private readonly initialCities: number[] = [
		2643743, // London
		2950159, // Berlin
		4219762, // Rome
		2761369, // Vienna
		2988507, // Paris
		3117735, // Madrid
	];

	forecasts: ForecastGroup;

	constructor() {}

	ngOnInit(): void {}
}
