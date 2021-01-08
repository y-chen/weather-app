import { Component } from '@angular/core';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';

@Component({
	selector: 'wa-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
	providers: [ComponentService],
})
export class ToolbarComponent implements IComponent {
	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.ToolbarComponent });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
