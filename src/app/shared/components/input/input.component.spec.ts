/* eslint-disable sonarjs/no-duplicate-string */

import { FormControl } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let host: SpectatorHost<InputComponent>;

	const createHost = createHostFactory({
		component: InputComponent,
	});

	it('should create', () => {
		host = createHost('<wa-input></wa-input>', {
			props: { control: new FormControl() },
		});

		const input = host.queryHost('wa-input');

		expect(host).toExist();
		expect(input).toExist();
	});

	describe('label', () => {
		it('should have label empty when host does not pass one', () => {
			host = createHost('<wa-input></wa-input>', {
				props: { control: new FormControl() },
			});

			const label = host.query('mat-label');

			expect(label.innerHTML.trim()).toHaveText('');
		});

		it('should dislay label correctly when passed by host', () => {
			const labelText = 'Label';
			host = createHost('<wa-input [label]="label"></wa-input>', {
				hostProps: { label: labelText },
				props: { control: new FormControl() },
			});

			const label = host.query('mat-label');

			expect(label).toContainText(labelText);
		});
	});

	describe('input', () => {
		it('should be required when [required] is passed by the host', () => {
			host = createHost('<wa-input required></wa-input>', {
				props: { control: new FormControl() },
			});

			const input = host.query('input');
			const required = input.hasAttribute('required');

			expect(required).toEqual(true);
		});

		it('should not be required when [required] is not passed by the host', () => {
			host = createHost('<wa-input></wa-input>', {
				props: { control: new FormControl() },
			});

			const input = host.query('input');
			const required = input.hasAttribute('required');

			expect(required).toEqual(false);
		});

		it('should have corrent type passed by host', () => {
			const passedType = 'email';
			host = createHost('<wa-input [type]="type"></wa-input>', {
				hostProps: { type: passedType },
				props: { control: new FormControl() },
			});

			const input = host.query('input');
			const inputType = input.getAttribute('type');

			expect(inputType).toEqual(passedType);
		});

		it('should be type password when [password] is passed', () => {
			host = createHost('<wa-input password></wa-input>', {
				props: { control: new FormControl() },
			});

			const input = host.query('input');
			const inputType = input.getAttribute('type');

			expect(inputType).toEqual('password');
		});
	});

	describe('mat-icon', () => {
		it('should not exists if [password] is not passed by host', () => {
			host = createHost('<wa-input></wa-input>', {
				props: { control: new FormControl() },
			});

			const icon = host.query('mat-icon');

			expect(icon).not.toExist();
		});

		it('should exists if [password] is passed by host', () => {
			host = createHost('<wa-input password></wa-input>', {
				props: { control: new FormControl() },
			});

			const icon = host.query('mat-icon');

			expect(icon).toExist();
		});

		it('should change showPassword value on click', () => {
			host = createHost('<wa-input password></wa-input>', {
				props: { control: new FormControl() },
			});

			const icon = host.query('mat-icon');
			icon.dispatchEvent(new Event('click'));
			const showPasswordFistClick = host.component.showPassword;

			icon.dispatchEvent(new Event('click'));
			const showPasswordSecontClick = host.component.showPassword;

			expect(showPasswordFistClick).toEqual(true);
			expect(showPasswordSecontClick).toEqual(false);
		});

		it('should change showPassword value on click', () => {
			host = createHost('<wa-input password></wa-input>', {
				props: { control: new FormControl() },
			});

			const iconBeforeClick = host.query('mat-icon');
			iconBeforeClick.dispatchEvent(new Event('click'));
			host.detectChanges();
			const iconAfterClick = host.query('mat-icon');

			expect(iconBeforeClick).toContainText('visibility');
			expect(iconAfterClick).toContainText('visibility_off');
		});
	});
});
