import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Notification, NotificationType} from '../../features/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _subject = new Subject<Notification>();
  private _idx = 0;

  constructor() { }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.info,title, message, timeout));
  }

  success(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.success, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.warning, title, message, timeout));
  }

  error(title: string, message: string, timeout = 0) {
    this._subject.next(new Notification(this._idx++, NotificationType.error, title, message, timeout));
  }


}

















// import {inject, Injectable} from '@angular/core';
// import {MatSnackBar} from '@angular/material/snack-bar';
// import {MatDialog} from '@angular/material/dialog';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private readonly snackBar = inject(MatSnackBar);
//   public dialog= inject(MatDialog) ;
//   constructor() { }
//
//   info(message:string){
//     this.openSnackBar(message,'','info-snackbar');
//   }
//   /**
//    * Presents a toast displaying the message with a green background
//    * @param message Message to display
//    * @example
//    * this.notificationService.success("confirm oked");
//    */
//   success(message: string) {
//     this.openSnackBar(message, '', 'success-snackbar');
//   }
//
//   warn(message: string){
//     this.openSnackBar(message,'','warn-snackbar');
//   }
//
//   /**
//    * Presents a toast displaying the message with a red background
//    * @param message Message to display
//    * @example
//    * this.notificationService.error("confirm canceled");
//    */
//   error(message: string) {
//     this.openSnackBar(message, '', 'error-snackbar');
//   }
//
//   openSnackBar(message: string, action: string, className = '', duration = 1000) {
//     this.snackBar.open(message, action, {
//       duration: duration,
//       panelClass: [className]
//     });
//   }
//
//   showNotification(message: string, action: string = 'Close') {
//     // Displaying the toast notification
//     this.snackBar.open(message, action, {
//       duration: 3000,  // Notification will disappear after 3 seconds
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//     });
//   }
// }

