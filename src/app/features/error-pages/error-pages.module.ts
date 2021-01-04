import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [CommonModule, ErrorPagesRoutingModule],
})
export class ErrorPagesModule {}
