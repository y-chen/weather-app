import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'page-not-found', component: ErrorPageComponent, data: { errorCode: 404 } },
			{ path: 'server-error', component: ErrorPageComponent, data: { errorCode: 500 } },
		],
	},
	{ path: 'error', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
