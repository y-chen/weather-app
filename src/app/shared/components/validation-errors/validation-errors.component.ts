import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationError } from '@cvm/web/models';

@Component({
	selector: 'cvm-validation-errors',
	templateUrl: './validation-errors.component.html',
	styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent {
	@Input() control: FormControl;
	@Input() errors: ValidationError[];
}
