import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CultureService } from './services/culture/culture.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	providers: [CultureService],
})
export class CoreModule {}
