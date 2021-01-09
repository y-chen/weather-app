export interface Environment {
	production: boolean;
	name: string;
	version: string;
	author: Author;
	firebase: FirebaseConfig;
	configId: string;
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
	hookUrl: string;
	channel: string;
}
