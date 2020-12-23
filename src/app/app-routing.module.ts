import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'app',
		loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
	},
	{ path: '', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
