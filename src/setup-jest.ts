import 'jest-extended';
import 'jest-preset-angular';
import '@ngneat/spectator/jest';

import { TranslateTestingModule } from 'ngx-translate-testing';

import { RouterTestingModule } from '@angular/router/testing';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { ConfigureFirebase } from '@wa/app/app.module';
import { CoreModule } from '@wa/app/core/core.module';
import { ErrorHandlersModule } from '@wa/app/error-handlers/error-handlers.module';
import { InterceptorsModule } from '@wa/app/interceptors/interceptors.module';
import { moduleDeclarations, moduleImports } from '@wa/app/shared/shared.module';

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
	declarations: moduleDeclarations,
	imports: [
		ConfigureFirebase,
		CoreModule,
		ErrorHandlersModule,
		InterceptorsModule,
		RouterTestingModule,
		TranslateTestingModule.withTranslations(TRANSLATIONS),
		...moduleImports,
	],
	providers: [],
});
