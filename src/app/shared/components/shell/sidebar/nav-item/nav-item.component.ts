import { Component, Input } from '@angular/core';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { NavItem } from '@wa/app/models/navigation.model';

@Component({
	selector: 'wa-nav-item',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss'],
	providers: [ComponentService],
})
export class NavItemComponent implements IComponent {
	@Input() item: NavItem;
	@Input() open?: boolean = true;

	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.NavItemComponent });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
