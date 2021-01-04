import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'app', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
	{ path: 'error', loadChildren: () => import('./features/error-pages/error-pages.module').then((m) => m.ErrorPagesModule) },
	{ path: '', redirectTo: 'app/home', pathMatch: 'full' },
	{ path: '**', redirectTo: '/error/page-not-found' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
