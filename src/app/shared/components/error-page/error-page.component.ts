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

	firstLineMessagePath: string;
	secondLineMessagePath: string;

	constructor(private readonly componentService: ComponentService, private readonly route: ActivatedRoute) {
		this.componentService.init({ localizationBasePath: 'shared.errorPage', route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.errorCode = (await this.componentService.getRouteData('errorCode')) as number;

		this.firstLineMessagePath = this.getLocalizationPath('firstLineMessage');
		this.secondLineMessagePath = this.getLocalizationPath('secondLineMessage');
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(`${this.errorCode}.${end}`);
	}
}
