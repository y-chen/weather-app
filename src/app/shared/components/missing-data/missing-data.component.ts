import { Component, Input } from '@angular/core';

@Component({
	selector: 'wa-missing-data',
	templateUrl: './missing-data.component.html',
	styleUrls: ['./missing-data.component.scss'],
})
export class MissingDataComponent {
	@Input() title: string;
	@Input() message: string;
}
