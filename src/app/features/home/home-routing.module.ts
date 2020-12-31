import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	GroupForecastResolver
} from '@wa/app/core/resolvers/group-forecast/group-forecast.resolver';
import { HomeComponent } from '@wa/app/features/home/components/home/home.component';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';

import { ForecastComponent } from './components/forecast/forecast.component';

const navItemsLocalizationBasePath = 'shell.sidebar.navItems';
const defaultCities: number[] = [
	2643743, // London
	2950159, // Berlin
	4219762, // Rome
	2761369, // Vienna
	2988507, // Paris
	3117735, // Madrid
];

const routes: Routes = [
	{
		path: '',
		component: ShellComponent,
		data: {
			navItems: [
				{ icon: 'home', label: `${navItemsLocalizationBasePath}.home`, route: 'home' },
				{
					icon: 'light_mode',
					label: `${navItemsLocalizationBasePath}.forecast`,
					route: 'forecast',
				},
			],
		},
		children: [
			{
				path: 'home',
				component: HomeComponent,
				resolve: { favouriteCitiesWeather: GroupForecastResolver },
				data: { defaultCities },
			},
			{
				path: 'forecast',
				component: ForecastComponent,
			},
			{
				path: 'forecast/:id',
				component: ForecastComponent,
			},
		],
	},
	{ path: 'app', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
