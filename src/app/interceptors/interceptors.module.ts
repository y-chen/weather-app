import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpLoggerInterceptor } from '@wa/app/interceptors/interceptors/http-logger/http-logger.interceptor';
import { LoaderInterceptor } from '@wa/app/interceptors/interceptors/loader/loader.interceptor';
import { ServerErrorInterceptor } from '@wa/app/interceptors/interceptors/server-error/server-error.interceptor';
import { LoaderService } from '@wa/app/interceptors/services/loader/loader.service';

@NgModule({
	providers: [
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
	],
})
export class InterceptorsModule {}
