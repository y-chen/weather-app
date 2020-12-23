import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { PositionService } from '@wa/app/core/services/position/position.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	exports: [],
	providers: [CultureService, LocalStorageService, NotificationService, PositionService],
})
export class CoreModule {}
