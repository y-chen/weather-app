import { ActivatedRoute, Router } from '@angular/router';

export interface IComponent {
	getLocalizationPath(end: string): string;
}

export interface ComponentParams {
	localizationBasePath?: string;
	route?: ActivatedRoute;
	router?: Router;
}
