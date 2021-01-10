import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'wa-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
	@Input() required?: boolean;
	@Input() label?: string;
	@Input() minRows?: number;
	@Input() maxRows?: string;

	@Input() control: FormControl;

	ngOnInit(): void {
		this.required = typeof this.required === 'boolean' ? this.required : this.required === '';
	}
}
