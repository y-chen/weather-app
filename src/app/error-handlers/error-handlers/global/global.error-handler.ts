import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { ExtendedError } from '@wa/app/models/error.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private readonly errorService: ErrorService) {}

	handleError(error: ExtendedError): void {
		this.errorService.handleError(error);
	}
}
