import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	PageNotFoundComponent
} from '@wa/app/features/error-pages/components/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		children: [{ path: 'page-not-found', component: PageNotFoundComponent }],
	},
	{ path: 'error', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
