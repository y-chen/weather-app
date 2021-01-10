/* eslint-disable @typescript-eslint/unbound-method */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { ElasticEmailService } from '@wa/app/core/services/elastic-email/elastic-email.service';
import { EmailComposerService } from '@wa/app/core/services/email-composer/email-composer.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { IComponent } from '@wa/app/models/component.model';
import { SendEmailParams } from '@wa/app/models/elastic-email.model';
import { ContactMeForm } from '@wa/app/models/email.model';
import { Profile } from '@wa/app/models/profile.model';
import { ValidationErrors } from '@wa/app/models/validation-errors.model';

@Component({
	selector: 'wa-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss'],
	providers: [ComponentService],
})
export class AboutMeComponent implements IComponent, OnInit {
	profile: Profile;
	contactMeForm: FormGroup;

	protected readonly validationErrors: ValidationErrors = {
		email: [{ type: 'email', message: `${LocalizationPathKeys.AboutMeComponent}.contactMe.errors.email.email` }],
		message: [{ type: 'required', message: `${LocalizationPathKeys.AboutMeComponent}.contactMe.errors.message.required` }],
	};

	constructor(
		private readonly componentService: ComponentService,
		private readonly cultureService: CultureService,
		private readonly emailComposerService: EmailComposerService,
		private readonly elasticEmailService: ElasticEmailService,
		private readonly formBuilder: FormBuilder,
		private readonly notificationService: NotificationService,
		private readonly route: ActivatedRoute,
	) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.AboutMeComponent, route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.profile = (await this.componentService.getResolverData('profile')) as Profile;

		this.contactMeForm = this.createContactMeForm();
	}

	onCancelClick(): void {
		this.contactMeForm = this.createContactMeForm();
	}

	async onSendClick(): Promise<void> {
		const contactFormData: ContactMeForm = this.contactMeForm.value as ContactMeForm;
		const email: SendEmailParams = this.emailComposerService.composeContactMeFormEmail(contactFormData);
		await this.elasticEmailService.sendEmail(email);

		const emailSentNotification = await this.cultureService.getTranslation(
			`${LocalizationPathKeys.AboutMeComponent}.contactMe.emailSentNotification`,
		);
		this.notificationService.showSuccess(emailSentNotification);

		this.contactMeForm = this.createContactMeForm();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private createContactMeForm(): FormGroup {
		return this.formBuilder.group({
			name: [null, []],
			email: [null, [Validators.email]],
			subject: [null, []],
			message: [null, [Validators.required]],
		});
	}
}
