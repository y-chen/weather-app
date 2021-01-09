/* eslint-disable @typescript-eslint/naming-convention */

import { Culture } from '../models/culture.model';

const LocalizationPathKeys = {
	AppComponent: 'app',
	ForecastComponent: 'features.main.forecast',
	HomeComponent: 'features.main.home',
	DayTimeWeatherComponent: 'shared.dayTimeWeather',
	ErrorPageComponent: 'shared.errorPage',
	FavouriteComponent: 'shared.favourite',
	AboutMeComponent: 'features.main.aboutMe',
	SearchComponent: 'shared.search',
	SettingsMenuComponent: 'shared.settingsMenu',
	WeatherCardComponent: 'shared.basicWeather',
	ToolbarComponent: 'shared.shell.toolbar',
	SidebarComponent: 'shared.shell.sidebar',
	NavItemComponent: 'shared.shell.sidebar',
	ShellComponent: 'shell',
	InputComponent: 'shared.input',
};

const StorageKeys = {
	Culture: 'culture',
	FavouriteCities: 'favourite-cities',
	HereOAuthToken: 'here-oauth-token',
	Position: 'position',
	Units: 'units',
};

const Cultures: Culture[] = [
	{
		label: 'English',
		language: 'en',
		code: 'en-GB',
	},
	{
		label: 'Italiano',
		language: 'it',
		code: 'it-IT',
	},
];

export { LocalizationPathKeys, StorageKeys, Cultures };
