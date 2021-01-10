export interface Environment {
	production: boolean;
	name: string;
	version: string;
	author: Author;
	firebase: FirebaseConfig;
	slack: SlackConfig;
	configId: string;
	profileId: string;
	key: string;
}

export interface Author {
	name: string;
	email: string;
}

export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

export interface SlackConfig {
	hookUrlEncrypted: string;
	channel: string;
}
