import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForecastResolver } from '../core/resolvers/forecast/forecast.resolver';
import { ProfileResolver } from '../core/resolvers/profile/profile.resolver';
import { WeatherGroupResolver } from '../core/resolvers/weather-group/weather-group.resolver';
import { ShellComponent } from '../shared/components/shell/shell.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HomeComponent } from './components/home/home.component';

const navItemsLocalizationBasePath = 'shared.shell.sidebar.navItems';
const defaultCities: string[] = [
        '51.5074,-0.1278', // London
        '52.52,13.405', // Berlin
        '41.9028,12.4964', // Rome
        '48.2082,16.3738', // Vienna
        '48.8566,2.3522', // Paris
        '40.4168,-3.7038', // Madrid
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
				{ icon: 'person', label: `${navItemsLocalizationBasePath}.aboutMe`, route: 'about-me' },
			],
		},
		children: [
			{
				path: 'home',
				component: HomeComponent,
				resolve: { favouritesWeather: WeatherGroupResolver },
				data: { defaultCities },
			},
			{
				path: 'forecast',
				resolve: { forecast: ForecastResolver },
				component: ForecastComponent,
			},
			{
				path: 'forecast/:id',
				resolve: { forecast: ForecastResolver },
				component: ForecastComponent,
			},
			{
				path: 'about-me',
				resolve: { profile: ProfileResolver },
				component: AboutMeComponent,
			},
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
		],
	},
	{ path: 'app', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
