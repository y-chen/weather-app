import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@wa/app/shared';

import { ConfigRoutingModule } from './config-routing.module';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
	declarations: [SettingsComponent],
	imports: [CommonModule, ConfigRoutingModule, SharedModule],
	exports: [],
	providers: [],
})
export class ConfigModule {}
