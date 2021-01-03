/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import Case from 'case';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'case',
})
export class CasePipe implements PipeTransform {
	transform(value: any, type: string = 'capital'): any {
		return Case[type](value);
	}
}
