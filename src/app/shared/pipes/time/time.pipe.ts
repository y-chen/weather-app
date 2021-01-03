import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'time',
})
export class TimePipe implements PipeTransform {
	transform(value: string): any {
		return value.split(' - ')[1];
	}
}
