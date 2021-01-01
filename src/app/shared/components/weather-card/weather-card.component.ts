import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { ViewWeather } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-weather-card',
	templateUrl: './weather-card.component.html',
	styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements IComponent, OnInit {
	@Input() viewData: ViewWeather;
	@Input() title?: string;
	@Input() subtitle?: string;
	@Input() iconSize?: 2 | 4;

	constructor(
		private readonly componentService: ComponentService,
		private readonly translate: TranslateService,
	) {
		this.componentService.init({ localizationBasePath: 'shared.basicWeather' });
	}

	async ngOnInit(): Promise<void> {
		this.title = this.title || this.viewData.title;
		this.subtitle = await this.getTranslatedTimeText();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private async getTranslatedTimeText(): Promise<string> | null {
		if (this.viewData.time) {
			const params = { time: this.viewData.time };
			const translationPromise = this.translate.get('shared.basicWeather.time', params).toPromise();

			return (await translationPromise) as string;
		}

		return null;
	}
}
