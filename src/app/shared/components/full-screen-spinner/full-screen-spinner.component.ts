import { Component, Input } from '@angular/core';

@Component({
	selector: 'wa-full-screen-spinner',
	templateUrl: './full-screen-spinner.component.html',
	styleUrls: ['./full-screen-spinner.component.scss'],
})
export class FullScreenSpinnerComponent {
	@Input() message?: string;
}
