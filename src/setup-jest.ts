import { RouterTestingModule } from '@angular/router/testing';

import 'jest-preset-angular';
import '@ngneat/spectator/jest';

import { defineGlobalsInjections } from '@ngneat/spectator';

import { AppRoutingModule } from './app/app-routing.module';

defineGlobalsInjections({
	declarations: [],
	imports: [RouterTestingModule],
	providers: [],
});
