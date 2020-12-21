import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CultureService } from './services/culture/culture.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { NotificationService } from './services/notification/notification.service';
import { PositionService } from './services/position/position.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	providers: [CultureService, LocalStorageService, NotificationService, PositionService],
})
export class CoreModule {}
