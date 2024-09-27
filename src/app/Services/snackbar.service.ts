import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  openSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message,'', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top', // or 'bottom'
      panelClass: ['custom-snackbar-success']  // Add custom class here
    });
  }
  openError(message: string,) {
    this.snackBar.open(message, "close", {     
      horizontalPosition: 'center',
      verticalPosition: 'top', // or 'bottom'
      panelClass: ['custom-snackbar-error']  // Add custom class here
    });
  }
}