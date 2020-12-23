import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@wa/app/features/home/components/home/home.component';

const navItemsLocalizationBasePath = 'shell.sidebar.navItems';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			navItems: [{ icon: 'home', label: `${navItemsLocalizationBasePath}.home`, route: 'home' }],
		},
		children: [{ path: 'home', component: HomeComponent }],
	},
	{ path: 'app', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
