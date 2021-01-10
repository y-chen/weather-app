export interface SendEmailParams {
	bodyType: 'bodyText' | 'bodyHtml';
	subject: string;
	message: string;
}
