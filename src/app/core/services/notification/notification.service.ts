import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
	constructor(private readonly snackBar: MatSnackBar) {}

	showSuccess(message: string): void {
		this.snackBar.open(message, 'X', { duration: 3000 });
	}

	showError(message: string): void {
		this.snackBar.open(message, 'X', { duration: 3000, panelClass: ['error'] });
	}
}
