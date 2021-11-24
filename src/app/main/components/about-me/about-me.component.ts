/* eslint-disable @typescript-eslint/unbound-method */

import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { ElasticEmailService } from '@wa/app/core/services/elastic-email/elastic-email.service';
import { EmailComposerService } from '@wa/app/core/services/email-composer/email-composer.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { IComponent } from '@wa/app/models/component.model';
import { Culture } from '@wa/app/models/culture.model';
import { SendEmailParams } from '@wa/app/models/elastic-email.model';
import { ContactMeForm } from '@wa/app/models/email.model';
import { Profile, Summary } from '@wa/app/models/profile.model';
import { ValidationErrors } from '@wa/app/models/validation-errors.model';

@Component({
	selector: 'wa-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss'],
	providers: [ComponentService],
})
export class AboutMeComponent implements IComponent, OnInit {
	loadingImage = true;
	summary: string;

	profile: Profile;
	contactMeForm: FormGroup;

	constructor(
		private readonly componentService: ComponentService,
		private readonly cultureService: CultureService,
		private readonly route: ActivatedRoute,
		private readonly settingsService: SettingsService,
	) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.AboutMeComponent, route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.profile = (await this.componentService.getResolverData('profile')) as Profile;

		const onLangChangeSub: Subscription = this.cultureService.onLangChange.subscribe(() => this.updateSummary());
		this.componentService.subscribe(onLangChangeSub);

		this.updateSummary();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private updateSummary(): void {
		const currentCulture: Culture = this.settingsService.getCulture();
		const foundSummary = this.profile.summaries.find((summary: Summary) => summary.language === currentCulture.language);

		this.summary = foundSummary.content;
	}
}
