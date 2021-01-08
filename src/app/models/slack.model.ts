export interface SlackMessage {
	timestamp: number;
	type: 'message' | 'error';
	content: unknown;
}

// export enum SlackMessageType {
// 	message = 'message',
// 	error = 'error',
// }
