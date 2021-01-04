import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

@Component({
	selector: 'wa-error-page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.scss'],
	providers: [ComponentService],
})
export class ErrorPageComponent implements OnInit {
	errorCode: number;
	firstLineMessage: string;
	secondLineMessage: string;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly cultureService: CultureService,
	) {
		this.componentService.init({ localizationBasePath: 'shared.errorPage', route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.errorCode = (await this.componentService.getRouteData('errorCode')) as number;

		const firstLineMessagePath = this.getLocalizationPath('firstLineMessage');
		const secondLineMessagePath = this.getLocalizationPath('secondLineMessage');

		this.firstLineMessage = await this.cultureService.getTranslation(firstLineMessagePath);
		this.secondLineMessage = await this.cultureService.getTranslation(secondLineMessagePath);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(`${this.errorCode}.${end}`);
	}
}
