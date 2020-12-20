import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';

export const importModules = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule,
	MaterialModule,
];
export const exportModules = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule,
	MaterialModule,
];

@NgModule({
	declarations: [],
	imports: importModules,
	exports: exportModules,
	providers: [],
})
export class SharedModule {}
