import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeItExtra from '@angular/common/locales/extra/it';
import localeIt from '@angular/common/locales/it';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '@wa/app/app-routing.module';
import { AppComponent } from '@wa/app/app.component';
import { CoreModule } from '@wa/app/core/core.module';
import { ErrorHandlersModule } from '@wa/app/error-handlers/error-handlers.module';
import { InterceptorsModule } from '@wa/app/interceptors/interceptors.module';
import { SharedModule } from '@wa/app/shared/shared.module';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeIt, 'it', localeItExtra);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguredTranslateModule = TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
		deps: [HttpClient],
	},
});

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ConfiguredTranslateModule,
		AppRoutingModule,
		CoreModule,
		ErrorHandlersModule,
		InterceptorsModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
