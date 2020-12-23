import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@wa/app/shared/material/material.module';
import { ValidationErrorsComponent } from '@wa/app/shared/components/validation-errors/validation-errors.component';
import { LanguageSelectorComponent } from '@wa/app/shared/components/language-selector/language-selector.component';

export const moduleDeclarations = [ValidationErrorsComponent, LanguageSelectorComponent];

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
];

export const moduleProviders = [];

@NgModule({
	declarations: moduleDeclarations,
	imports: moduleImports,
	exports: moduleExports,
	providers: moduleProviders,
})
export class SharedModule {}
