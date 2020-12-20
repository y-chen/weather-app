import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		data: { localizationBasePath: 'config.settings' },
	},
	{ path: 'config', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ConfigRoutingModule {}
