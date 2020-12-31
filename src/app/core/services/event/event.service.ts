import { EventEmitter, Injectable } from '@angular/core';
import { LoadingInfo } from '@wa/app/models/loading-info.model';

@Injectable()
export class EventService {
	loading: EventEmitter<LoadingInfo> = new EventEmitter<LoadingInfo>();
}
