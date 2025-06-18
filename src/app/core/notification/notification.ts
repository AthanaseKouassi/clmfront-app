import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class Notification {
  private readonly snackBar = inject(MatSnackBar);
  public dialog= inject(MatDialog) ;
  constructor() { }

  info(message:string){
    this.openSnackBar(message,'','info-snackbar');
  }
  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   * @example
   * this.notificationService.success("confirm oked");
   */
  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  warn(message: string){
    this.openSnackBar(message,'','warn-snackbar');
  }

  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   * @example
   * this.notificationService.error("confirm canceled");
   */
  error(message: string) {
    this.openSnackBar(message, '', 'error-snackbar');
  }

  openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 1000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className]
    });
  }
}
