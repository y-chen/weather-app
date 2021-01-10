import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BasicWeatherComponent } from './components/basic-weather/basic-weather.component';
import { DayTimeWeatherComponent } from './components/day-time-weather/day-time-weather.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { FullScreenSpinnerComponent } from './components/full-screen-spinner/full-screen-spinner.component';
import { InputComponent } from './components/input/input.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { MissingDataComponent } from './components/missing-data/missing-data.component';
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { FooterComponent } from './components/shell/footer/footer.component';
import { ShellComponent } from './components/shell/shell.component';
import { NavItemComponent } from './components/shell/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from './components/shell/sidebar/sidebar.component';
import { ToolbarComponent } from './components/shell/toolbar/toolbar.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { MaterialModule } from './material/material.module';
import { CasePipe } from './pipes/case/case.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { LocalizedDatePipe } from './pipes/localized-date/localized-date.pipe';

export const sharedModuleDeclarations = [
	BasicWeatherComponent,
	CasePipe,
	DayTimeWeatherComponent,
	ErrorPageComponent,
	FavouriteComponent,
	FooterComponent,
	FullScreenSpinnerComponent,
	InputComponent,
	KeysPipe,
	LanguageSelectorComponent,
	LocalizedDatePipe,
	MissingDataComponent,
	NavItemComponent,
	OverlaySpinnerComponent,
	SearchComponent,
	SettingsMenuComponent,
	ShellComponent,
	SidebarComponent,
	TextAreaComponent,
	ToolbarComponent,
	ValidationErrorsComponent,
	WeatherCardComponent,
];

export const sharedModuleImports = [
	CommonModule,
	FormsModule,
	HttpClientModule,
	MaterialModule,
	ReactiveFormsModule,
	RouterModule,
	TranslateModule,
];

@NgModule({
	declarations: sharedModuleDeclarations,
	imports: sharedModuleImports,
	exports: [
		BasicWeatherComponent,
		CasePipe,
		CommonModule,
		DayTimeWeatherComponent,
		ErrorPageComponent,
		FavouriteComponent,
		FullScreenSpinnerComponent,
		FooterComponent,
		FormsModule,
		HttpClientModule,
		InputComponent,
		KeysPipe,
		LanguageSelectorComponent,
		LocalizedDatePipe,
		MaterialModule,
		MissingDataComponent,
		NavItemComponent,
		OverlaySpinnerComponent,
		ReactiveFormsModule,
		SearchComponent,
		ShellComponent,
		SidebarComponent,
		TextAreaComponent,
		ToolbarComponent,
		TranslateModule,
		ValidationErrorsComponent,
		WeatherCardComponent,
	],
	providers: [],
})
export class SharedModule {}
