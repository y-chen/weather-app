import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';

@Component({
	selector: 'wa-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [ComponentService],
})
export class InputComponent implements IComponent, OnInit {
	@Input() type?: 'text' | 'email' | 'password';
	@Input() password?: boolean;
	@Input() required?: boolean;
	@Input() label?: string;
	@Input() control: FormControl;

	showPassword: boolean;

	constructor(private readonly component: ComponentService) {
		this.component.init({ localizationBasePath: LocalizationPathKeys.InputComponent });
	}

	ngOnInit(): void {
		this.password = typeof this.password === 'boolean' ? this.password : this.password === '';
		this.required = typeof this.required === 'boolean' ? this.required : this.required === '';

		if (this.password) {
			this.type = 'password';
		}
	}

	onShowPasswordClick(): void {
		this.showPassword = !this.showPassword;
	}

	getLocalizationPath(end: string): string {
		return this.component.getLocalizationPath(end);
	}
}
