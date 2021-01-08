/* eslint-disable @typescript-eslint/naming-convention */

const LocalizationPathKeys = {
	ForecastComponent: 'features.main.forecast',
	HomeComponent: 'features.main.home',
	DayTimeWeatherComponent: 'shared.dayTimeWeather',
	ErrorPageComponent: 'shared.errorPage',
	FavouriteComponent: 'shared.favourite',
	SearchComponent: 'shared.search',
	SettingsMenuComponent: 'shared.settingsMenu',
	WeatherCardComponent: 'shared.basicWeather',
	ToolbarComponent: 'shared.shell.toolbar',
	SidebarComponent: 'shared.shell.sidebar',
	NavItemComponent: 'shared.shell.sidebar',
	ShellComponent: 'shell',
};

const StorageKeys = {
	Config: 'config',
	Culture: 'culture',
	FavouriteCities: 'favourite-cities',
	HereOAuthToken: 'here-oauth-token',
	Position: 'position',
	Units: 'units',
};

export { LocalizationPathKeys, StorageKeys };
