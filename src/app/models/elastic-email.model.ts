/* eslint-disable no-shadow */

export interface SendEmailBody {
	bodyType: EmailBody;
	subject: string;
	message: string;
}

export enum EmailBody {
	text = 'bodyText',
	html = 'bodyHtml',
}
