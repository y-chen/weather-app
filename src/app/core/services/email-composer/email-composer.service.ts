import { Injectable } from '@angular/core';
import { SendEmailParams } from '@wa/app/models/elastic-email.model';
import { ContactMeForm } from '@wa/app/models/email.model';

@Injectable()
export class EmailComposerService {
	composeContactMeFormEmail(formData: ContactMeForm): SendEmailParams {
		const { name, email, subject, message } = formData;
		const emailHtmlBody = `
    <h3>New email from NG Weather App Contact Form</h3>

    <h5>From</h5>
    <span>${name ? name : '[Name not provided]'} - ${email ? email : '[Email not provided]'}</span>

    <h5>Subject</h5>
    <p>${subject ? subject : '[Subject not provided]'}</p>

    <h5>Message</h5>
    <p>${message}</p>
    `;

		return {
			bodyType: 'bodyHtml',
			subject: subject ? subject : 'NG Weather App Contact Form',
			message: emailHtmlBody,
		};
	}
}
