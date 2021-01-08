import { Provider } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { ValidationError } from '@wa/app/models/validation-errors.model';

import { ValidationErrorsComponent } from './validation-errors.component';

describe('ValidationErrorsComponent', () => {
	let host: SpectatorHost<ValidationErrorsComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(ValidationErrorsComponent);

	let errorMessages: ValidationError[];

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig().mockCultureWithEnglish();

		configProvider = configServiceProvider;

		errorMessages = [
			{ type: 'required', message: 'REQUIRED' },
			{ type: 'pattern', message: 'PATTERN' },
		];
	});

	it('should create', () => {
		host = createHost('<wa-validation-errors></wa-validation-errors>', {
			props: { control: new FormControl() },
			providers: [configProvider],
		});

		const input = host.queryHost('wa-validation-errors');

		expect(host).toExist();
		expect(input).toExist();
	});

	it('should display error message when control has same error type', () => {
		host = createHost('<wa-validation-errors [errors]="errors"></wa-validation-errors>', {
			hostProps: { errors: errorMessages },
			props: { control: new FormControl() },
			providers: [configProvider],
		});

		host.component.control.setErrors({ required: true, pattern: true });
		host.detectChanges();
		const errors = host.queryAll('mat-error');

		expect(errors).toHaveLength(errorMessages.length);
		expect(errors[0]).toContainText('REQUIRED');
		expect(errors[1]).toContainText('PATTERN');
	});

	it('should not display error message when control has not it', () => {
		host = createHost('<wa-validation-errors [errors]="errors"></wa-validation-errors>', {
			hostProps: { errors: errorMessages },
			props: { control: new FormControl() },
			providers: [configProvider],
		});

		host.component.control.setErrors({ pattern: true });
		host.detectChanges();
		const errors = host.queryAll('mat-error');

		expect(errors).toHaveLength(1);
		expect(errors[0]).not.toContainText('REQUIRED');
		expect(errors[0]).toContainText('PATTERN');
	});
});
