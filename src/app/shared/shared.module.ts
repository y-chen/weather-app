import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
	BasicWeatherComponent
} from '@wa/app/shared/components/basic-weather/basic-weather.component';
import {
	DayTimeWeatherComponent
} from '@wa/app/shared/components/day-time-weather/day-time-weather.component';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';
import {
	LanguageSelectorComponent
} from '@wa/app/shared/components/language-selector/language-selector.component';
import {
	MissingDataComponent
} from '@wa/app/shared/components/missing-data/missing-data.component';
import {
	OverlaySpinnerComponent
} from '@wa/app/shared/components/overlay-spinner/overlay-spinner.component';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import {
	SettingsMenuComponent
} from '@wa/app/shared/components/settings-menu/settings-menu.component';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';
import {
	NavItemComponent
} from '@wa/app/shared/components/shell/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '@wa/app/shared/components/shell/sidebar/sidebar.component';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';
import {
	ValidationErrorsComponent
} from '@wa/app/shared/components/validation-errors/validation-errors.component';
import {
	WeatherCardComponent
} from '@wa/app/shared/components/weather-card/weather-card.component';
import { MaterialModule } from '@wa/app/shared/material/material.module';
import { CasePipe } from '@wa/app/shared/pipes/case/case.pipe';
import { KeysPipe } from '@wa/app/shared/pipes/keys/keys.pipe';
import { LocalizedDatePipe } from '@wa/app/shared/pipes/localized-date/localized-date.pipe';
import { TimePipe } from '@wa/app/shared/pipes/time/time.pipe';

export const moduleDeclarations = [
	ValidationErrorsComponent,
	LanguageSelectorComponent,
	ShellComponent,
	ToolbarComponent,
	SidebarComponent,
	NavItemComponent,
	SearchComponent,
	BasicWeatherComponent,
	OverlaySpinnerComponent,
	WeatherCardComponent,
	DayTimeWeatherComponent,
	FavouriteComponent,
	LocalizedDatePipe,
	MissingDataComponent,
	SettingsMenuComponent,
	CasePipe,
	TimePipe,
	KeysPipe,
];

export const moduleImports = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	RouterModule,
	ReactiveFormsModule,
	TranslateModule,
	MaterialModule,
];

export const moduleExports = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule,
	MaterialModule,
	ValidationErrorsComponent,
	LanguageSelectorComponent,
	ShellComponent,
	ToolbarComponent,
	SidebarComponent,
	NavItemComponent,
	SearchComponent,
	BasicWeatherComponent,
	OverlaySpinnerComponent,
	WeatherCardComponent,
	DayTimeWeatherComponent,
	LocalizedDatePipe,
	CasePipe,
	TimePipe,
	KeysPipe,
	FavouriteComponent,
	MissingDataComponent,
];

export const moduleProviders: Provider[] = [];

@NgModule({
	declarations: moduleDeclarations,
	imports: moduleImports,
	exports: moduleExports,
	providers: moduleProviders,
})
export class SharedModule {}
