import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
	ComponentService,
	CultureService,
	LocalStorageService,
	NotificationService,
	StorageKeys,
	PositionService,
} from '@wa/app/core';

import { Culture, IComponent, ValidationErrors } from '@wa/app/models';

@Component({
	selector: 'wa-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	providers: [ComponentService],
})
export class SettingsComponent implements IComponent, OnInit {
	validationErrors: ValidationErrors;

	cultures: Culture[];
	form: FormGroup;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly cultureService: CultureService,
		private readonly fb: FormBuilder,
		private readonly positionService: PositionService,
		private readonly localStorageService: LocalStorageService,
		private readonly notificationService: NotificationService,
	) {
		this.componentService.init(this.route);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.form = this.createForm();
		this.validationErrors = {
			culture: [{ type: 'required', message: this.getLocalizationPath('errors.culture.required') }],
		};
	}

	createForm(): FormGroup {
		return this.fb.group({
			culture: [null, [Validators.required]],
			allowLocalization: [null, []],
		});
	}

	onAllowLocalizationChange() {
		const allowLocalizationControl = this.form.get('allowLocalization');

		if (allowLocalizationControl.value) {
			try {
				this.positionService.getPosition();
			} catch (error) {
				this.notificationService.showError(error.message);
			}
		}

		if (!allowLocalizationControl.value) {
			this.localStorageService.remove(StorageKeys.Position);
		}
	}

	onConfirmClick() {}
}
