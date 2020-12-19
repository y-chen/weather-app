import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@wa/app/shared';
import { CoreModule } from '@wa/app/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
