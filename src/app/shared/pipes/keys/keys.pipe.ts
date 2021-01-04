/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable security/detect-object-injection */

import Case from 'case';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
	transform(value: any): any[] {
		const keys = [];

		for (const enumMember in value) {
			if (!isNaN(parseInt(enumMember, 10))) {
				keys.push({ key: +enumMember, value: value[enumMember] });
			} else {
				keys.push({ key: Case.capital(enumMember), value: value[enumMember] });
			}
		}

		return keys;
	}
}
