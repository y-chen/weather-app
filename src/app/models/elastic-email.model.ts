/* eslint-disable no-shadow */

export interface SendEmailBody {
	subject: string;
	bodyType: EmailBody;
	message: string;
}

export enum EmailBody {
	text = 'bodyText',
	html = 'bodyHtml',
}
