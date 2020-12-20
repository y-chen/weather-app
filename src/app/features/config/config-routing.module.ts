import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';

const routes: Routes = [
	{
		path: '',
		component: LanguageSelectionComponent,
		data: { localizationBasePath: 'config.languageSelection' },
	},
	{ path: 'config', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ConfigRoutingModule {}
