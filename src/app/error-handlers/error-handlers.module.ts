import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalErrorHandler } from '@wa/app/error-handlers/error-handlers/global/global.error-handler';

@NgModule({
	providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class ErrorHandlersModule {}
