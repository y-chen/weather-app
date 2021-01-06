import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { Weather } from '@wa/app/models/open-weather-parser.model';

@Component({
	selector: 'wa-weather-card',
	templateUrl: './weather-card.component.html',
	styleUrls: ['./weather-card.component.scss'],
	providers: [ComponentService],
})
export class WeatherCardComponent implements IComponent, OnInit {
	@Input() viewData: Weather;
	@Input() title?: string;
	@Input() subtitle?: string;

	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: 'shared.basicWeather' });
	}

	ngOnInit(): void {
		this.title = this.title || this.viewData.title;
		this.subtitle = this.subtitle || this.viewData.time;
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
