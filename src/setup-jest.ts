import { RouterTestingModule } from '@angular/router/testing';

import 'jest-preset-angular';
import '@ngneat/spectator/jest';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { moduleDeclarations, moduleImports } from '@wa/app/shared/shared.module';
import { ConfiguredTranslateModule } from '@wa/app/app.module';
import { CoreModule } from './app/core/core.module';

const ENGLISH_LANGUAGE = 'en';
const ENGLISH_TRANSLATIONS = {
	pleasantries: {
		greeting: 'Hello',
		appreciation: 'Thank You!',
	},
};

const SPANISH_LANGUAGE = 'es';
const SPANISH_TRANSLATIONS = {
	pleasantries: {
		greeting: 'Hola',
		appreciation: 'Gracias',
	},
};

const TRANSLATIONS = {
	[ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
	[SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS,
};

defineGlobalsInjections({
	declarations: [...moduleDeclarations],
	imports: [
		RouterTestingModule,
		TranslateTestingModule.withTranslations(TRANSLATIONS),
		CoreModule,
		...moduleImports,
	],
	providers: [],
});
