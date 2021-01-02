import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { NavItem } from '@wa/app/models/navigation.model';

@Component({
	selector: 'wa-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss'],
	providers: [ComponentService],
})
export class ShellComponent implements OnInit {
	navItems: NavItem[];

	constructor(private readonly componentService: ComponentService, private readonly route: ActivatedRoute) {
		this.componentService.init({ localizationBasePath: 'shell', route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.navItems = (await this.componentService.getRouteData('navItems')) as NavItem[];
	}
}
