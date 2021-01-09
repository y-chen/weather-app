export interface Profile {
	pictureUrl: string;
	summary: string;
	links: Link[];
}

export interface Link {
	icon: string;
	name: string;
	url: string;
}
