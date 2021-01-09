/* eslint-disable @typescript-eslint/naming-convention */

import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeItExtra from '@angular/common/locales/extra/it';
import localeIt from '@angular/common/locales/it';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@wa/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/services/config/config.service';
import { ErrorHandlersModule } from './error-handlers/error-handlers.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeIt, 'it', localeItExtra);

export const ConfigureApp = {
	provide: APP_INITIALIZER,
	useFactory: (config: ConfigService) => () => config.loadConfig(),
	deps: [ConfigService],
	multi: true,
};

export const ConfigureTranslateModule = TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
		deps: [HttpClient],
	},
});

export const ConfigureFirebase = AngularFireModule.initializeApp(environment.firebase);

@NgModule({
	declarations: [AppComponent],
	imports: [
		AngularFireFunctionsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		ConfigureFirebase,
		ConfigureTranslateModule,
		CoreModule,
		ErrorHandlersModule,
		InterceptorsModule,
		SharedModule,
	],
	providers: [ConfigureApp],
	bootstrap: [AppComponent],
})
export class AppModule {}
