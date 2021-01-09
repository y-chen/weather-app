import { Injectable } from '@angular/core';
import { EmailBody, SendEmailBody } from '@wa/app/models/elastic-email.model';
import { ContactMeForm } from '@wa/app/models/email.model';

@Injectable()
export class EmailComposerService {
	composeContactMeFormEmail(formData: ContactMeForm): SendEmailBody {
		const { name, email, subject, message } = formData;
		const emailHtmlBody = `
    <h1>
      New email from NG Weather App Contact Form
    </h1>

    <h2>
      From
    </2>

    <span>${name ? name : '[Name not provided]'} - ${email ? email : '[Email not provided]'}</span>

    <h2>Subject</h1>

    <p>${subject ? subject : '[Subject not provided]'}</p>

    <h2>Message</h1>

    <p>${message}</p>
    `;

		return {
			bodyType: EmailBody.html,
			subject: subject ? subject : 'NG Weather App Contact Form',
			message: emailHtmlBody,
		};
	}
}
