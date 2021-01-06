/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Observable, of } from 'rxjs';

import { Culture } from '@wa/app/models/culture.model';

export interface ApiServiceMocks {
	body: any;
	culture: Culture;
	result: Observable<string>;
	url: string;
}

export const getApiServiceMocks = (): ApiServiceMocks => {
	const body = {
		key: 'value',
	};

	const culture: Culture = {
		label: 'English',
		language: 'en',
		code: 'en-GB',
	};

	const result: Observable<string> = of('foo.bar');
	const url = 'http://example.com';

	return { body, culture, result, url };
};
