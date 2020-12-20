import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';

export const importModules = [CommonModule, HttpClientModule, TranslateModule, MaterialModule];
export const exportModules = [CommonModule, HttpClientModule, TranslateModule, MaterialModule];

@NgModule({
	declarations: [],
	imports: importModules,
	exports: exportModules,
	providers: [],
})
export class SharedModule {}
