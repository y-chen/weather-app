import { ErrorHandler, NgModule } from '@angular/core';

import { GlobalErrorHandler } from './error-handlers/global.error-handler';

@NgModule({
	providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class ErrorHandlersModule {}
