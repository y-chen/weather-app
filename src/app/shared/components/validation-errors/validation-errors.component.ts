import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationError } from '@wa/app/models/validation-errors.model';

@Component({
	selector: 'wa-validation-errors',
	templateUrl: './validation-errors.component.html',
	styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent {
	@Input() control: FormControl;
	@Input() errors: ValidationError[];
}
