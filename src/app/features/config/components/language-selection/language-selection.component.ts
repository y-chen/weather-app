import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComponentService, CultureService } from '@wa/app/core';
import { Culture, IComponent } from '@wa/app/models';

@Component({
	selector: 'wa-language-selection',
	templateUrl: './language-selection.component.html',
	styleUrls: ['./language-selection.component.scss'],
	providers: [ComponentService],
})
export class LanguageSelectionComponent implements IComponent, OnInit {
	cultures: Culture[];
	selectedCuture: Culture;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly cultureService: CultureService,
	) {
		this.componentService.init(this.route);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
	}
}
