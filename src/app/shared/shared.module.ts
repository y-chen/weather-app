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
	LanguageSelectorComponent
} from '@wa/app/shared/components/language-selector/language-selector.component';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';
import {
	NavItemComponent
} from '@wa/app/shared/components/shell/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '@wa/app/shared/components/shell/sidebar/sidebar.component';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';
import {
	ValidationErrorsComponent
} from '@wa/app/shared/components/validation-errors/validation-errors.component';
import { MaterialModule } from '@wa/app/shared/material/material.module';

export const moduleDeclarations = [
	ValidationErrorsComponent,
	LanguageSelectorComponent,
	ShellComponent,
	ToolbarComponent,
	SidebarComponent,
	NavItemComponent,
	SearchComponent,
	BasicWeatherComponent,
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
];

export const moduleProviders: Provider[] = [];

@NgModule({
	declarations: moduleDeclarations,
	imports: moduleImports,
	exports: moduleExports,
	providers: moduleProviders,
})
export class SharedModule {}
