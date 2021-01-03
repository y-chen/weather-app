import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
	public isLoading = new BehaviorSubject(false);
}
