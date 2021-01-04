import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';

@Component({
	selector: 'wa-error-page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.scss'],
	providers: [ComponentService],
})
export class ErrorPageComponent implements OnInit {
	case = 'upper';

	errorCode: string;
	firstLineMessage: string;
	secondLineMessage: string;

	firstLineMessagePath: string;
	secondLineMessagePath: string;

	constructor(private readonly componentService: ComponentService, private readonly route: ActivatedRoute) {
		this.componentService.init({ localizationBasePath: 'shared.errorPage', route: this.route });
	}

	async ngOnInit(): Promise<void> {
		await this.initializeErrorInfo();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(`${this.errorCode}.${end}`);
	}

	private async initializeErrorInfo(): Promise<void> {
		this.errorCode = (await this.componentService.getRouteParam('errorCode')) as string;

		switch (this.errorCode) {
			case '400':
			case '404':
			case '500':
				break;
			default:
				this.errorCode = 'unknown';
				break;
		}

		this.firstLineMessagePath = this.getLocalizationPath('firstLineMessage');
		this.secondLineMessagePath = this.getLocalizationPath('secondLineMessage');
	}
}
