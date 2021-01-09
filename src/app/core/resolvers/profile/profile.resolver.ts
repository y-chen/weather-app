import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Profile } from '@wa/app/models/profile.model';
import { environment } from '@wa/environments/environment';

import { ProfileService } from '../../services/profile/profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
	constructor(private readonly profileService: ProfileService) {}

	async resolve(): Promise<Profile> {
		return await this.profileService.getProfileById(environment.profileId);
	}
}
