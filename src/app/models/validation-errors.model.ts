export interface ValidationErrors {
	[key: string]: ValidationError[];
}

export interface ValidationError {
	type: string;
	message: string;
}
