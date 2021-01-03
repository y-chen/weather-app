import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

@Pipe({
	name: 'localizedDate',
	pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
	constructor(private readonly cultureService: CultureService) {}

	transform(value: any, pattern: string = 'fullDate'): any {
		const datePipe: DatePipe = new DatePipe(this.cultureService.getCulture().language);

		return datePipe.transform(value, pattern);
	}
}
