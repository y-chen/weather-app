import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
	{ path: 'app', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
	{ path: 'error/:errorCode', component: ErrorPageComponent },
	{ path: '', redirectTo: 'app/home', pathMatch: 'full' },
	{ path: '**', redirectTo: '/error/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
