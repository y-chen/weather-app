export interface SlackMessage {
	timestamp: number;
	type: SlackMessageType;
	content: unknown;
}

export type SlackMessageType = 'message' | 'error';
