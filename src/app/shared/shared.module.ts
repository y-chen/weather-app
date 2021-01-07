import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { DayTimeWeatherComponent } from '@wa/app/shared/components/day-time-weather/day-time-weather.component';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';
import { LanguageSelectorComponent } from '@wa/app/shared/components/language-selector/language-selector.component';
import { MissingDataComponent } from '@wa/app/shared/components/missing-data/missing-data.component';
import { OverlaySpinnerComponent } from '@wa/app/shared/components/overlay-spinner/overlay-spinner.component';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import { SettingsMenuComponent } from '@wa/app/shared/components/settings-menu/settings-menu.component';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';
import { NavItemComponent } from '@wa/app/shared/components/shell/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '@wa/app/shared/components/shell/sidebar/sidebar.component';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';
import { ValidationErrorsComponent } from '@wa/app/shared/components/validation-errors/validation-errors.component';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';
import { MaterialModule } from '@wa/app/shared/material/material.module';
import { CasePipe } from '@wa/app/shared/pipes/case/case.pipe';
import { KeysPipe } from '@wa/app/shared/pipes/keys/keys.pipe';
import { LocalizedDatePipe } from '@wa/app/shared/pipes/localized-date/localized-date.pipe';

export const moduleDeclarations = [
	BasicWeatherComponent,
	CasePipe,
	DayTimeWeatherComponent,
	ErrorPageComponent,
	FavouriteComponent,
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
	ToolbarComponent,
	ValidationErrorsComponent,
	WeatherCardComponent,
];

export const moduleImports = [
	CommonModule,
	FormsModule,
	HttpClientModule,
	MaterialModule,
	ReactiveFormsModule,
	RouterModule,
	TranslateModule,
];

export const moduleExports = [
	BasicWeatherComponent,
	CasePipe,
	CommonModule,
	DayTimeWeatherComponent,
	ErrorPageComponent,
	FavouriteComponent,
	FormsModule,
	HttpClientModule,
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
	ToolbarComponent,
	TranslateModule,
	ValidationErrorsComponent,
	WeatherCardComponent,
];

export const moduleProviders: Provider[] = [];

@NgModule({
	declarations: moduleDeclarations,
	imports: moduleImports,
	exports: moduleExports,
	providers: moduleProviders,
})
export class SharedModule {}
