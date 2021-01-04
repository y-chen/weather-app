import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

	constructor(private readonly componentService: ComponentService, private readonly route: ActivatedRoute) {
		this.componentService.init({ localizationBasePath: 'shared.shell.sidebar' });
	}

	toggle(): void {
		this.closed = !this.closed;
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
