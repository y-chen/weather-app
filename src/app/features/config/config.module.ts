import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@wa/app/shared';

import { ConfigRoutingModule } from './config-routing.module';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';

@NgModule({
	declarations: [LanguageSelectionComponent],
	imports: [CommonModule, ConfigRoutingModule, SharedModule],
	exports: [],
	providers: [],
})
export class ConfigModule {}
