import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

@Pipe({
	name: 'localizedDate',
	pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
	constructor(private readonly settingsService: SettingsService) {}

	transform(value: any, pattern: string = 'fullDate'): any {
		const datePipe: DatePipe = new DatePipe(this.settingsService.getCulture().language);

		return datePipe.transform(value, pattern);
	}
}
