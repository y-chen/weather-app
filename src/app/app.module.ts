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
import { AppRoutingModule } from '@wa/app/app-routing.module';
import { AppComponent } from '@wa/app/app.component';
import { CoreModule } from '@wa/app/core/core.module';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { ErrorHandlersModule } from '@wa/app/error-handlers/error-handlers.module';
import { InterceptorsModule } from '@wa/app/interceptors/interceptors.module';
import { SharedModule } from '@wa/app/shared/shared.module';
import { environment } from '@wa/environments/environment';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeIt, 'it', localeItExtra);

export const ConfigureApp = {
	provide: APP_INITIALIZER,
	useFactory: (configService: ConfigService) => async () => await configService.loadConfig(),
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
		BrowserModule,
		BrowserAnimationsModule,
		ConfigureTranslateModule,
		AppRoutingModule,
		CoreModule,
		ErrorHandlersModule,
		InterceptorsModule,
		SharedModule,
		ConfigureFirebase,
		AngularFireFunctionsModule,
	],
	providers: [ConfigureApp],
	bootstrap: [AppComponent],
})
export class AppModule {}
