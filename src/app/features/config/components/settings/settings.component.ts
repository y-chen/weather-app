import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ComponentService, CultureService } from '@wa/app/core';
import { Culture, IComponent } from '@wa/app/models';

@Component({
	selector: 'wa-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	providers: [ComponentService],
})
export class SettingsComponent implements IComponent, OnInit {
	cultures: Culture[];
	form: FormGroup;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly cultureService: CultureService,
		private readonly fb: FormBuilder,
	) {
		this.componentService.init(this.route);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.form = this.createForm();
	}

	createForm(): FormGroup {
		return this.fb.group({
			culture: [null, [Validators.required]],
			localization: [null, []],
		});
	}

	onConfirmClick() {}
}
