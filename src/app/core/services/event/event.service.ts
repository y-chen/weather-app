import { EventEmitter, Injectable } from '@angular/core';
import { LoadingInfo } from '@wa/app/models/loading-info.model';

@Injectable()
export class EventService {
	onLoading: EventEmitter<LoadingInfo> = new EventEmitter<LoadingInfo>();
	onSettingsChange: EventEmitter<any> = new EventEmitter<any>();
}
