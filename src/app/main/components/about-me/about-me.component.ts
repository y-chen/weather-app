import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { IComponent } from '@wa/app/models/component.model';
import { Profile } from '@wa/app/models/profile.model';

@Component({
	selector: 'wa-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss'],
	providers: [ComponentService],
})
export class AboutMeComponent implements IComponent, OnInit {
	profile: Profile;

	constructor(private readonly componentService: ComponentService, private readonly route: ActivatedRoute) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.AboutMeComponent, route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.profile = (await this.componentService.getResolverData('profile')) as Profile;
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
