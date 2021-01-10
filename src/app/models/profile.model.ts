export interface Profile {
	pictureUrl: string;
	summaries: Summary[];
	links: Link[];
}

export interface Summary {
	language: string;
	content: string;
}

export interface Link {
	icon: string;
	name: string;
	url: string;
}
