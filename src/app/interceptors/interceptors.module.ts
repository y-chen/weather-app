import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { HttpLoggerInterceptor } from './interceptors/http-logger/http-logger.interceptor';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
	providers: [
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true },
	],
})
export class InterceptorsModule {}
