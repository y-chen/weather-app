import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { NavItem } from '@wa/app/models/navigation.model';

@Component({
	selector: 'wa-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	providers: [ComponentService],
})
export class SidebarComponent implements IComponent {
	@Input() navItems: NavItem[];

	closed = false;

	constructor(private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.SidebarComponent });
	}

	toggle(): void {
		this.closed = !this.closed;
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
