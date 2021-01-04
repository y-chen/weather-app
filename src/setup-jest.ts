import 'jest-extended';
import 'jest-preset-angular';
import '@ngneat/spectator/jest';

import { TranslateTestingModule } from 'ngx-translate-testing';

import { RouterTestingModule } from '@angular/router/testing';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { moduleDeclarations, moduleImports } from '@wa/app/shared/shared.module';

import { CoreModule } from './app/core/core.module';
import { ErrorHandlersModule } from './app/error-handlers/error-handlers.module';
import { InterceptorsModule } from './app/interceptors/interceptors.module';

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
		ErrorHandlersModule,
		InterceptorsModule,
		...moduleImports,
	],
	providers: [],
});
