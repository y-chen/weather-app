import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'config',
		loadChildren: () => import('./features/config/config.module').then((m) => m.ConfigModule),
	},
	{ path: '', redirectTo: 'config', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
