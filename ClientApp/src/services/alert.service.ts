import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {
    constructor(private _snackBar: MatSnackBar) {
    }

    private configSuccess: MatSnackBarConfig = {
        panelClass: ['style-succes'],
        horizontalPosition: 'end',
        duration: 5000
    };

    private configError: MatSnackBarConfig = {
        panelClass: ['style-error'],
        horizontalPosition: 'end',
        duration: 5000
    };

    private configWarning: MatSnackBarConfig = {
        panelClass: ['style-warning'],
        horizontalPosition: 'end',
        duration: 5000
    };

    private configInfo: MatSnackBarConfig = {
        panelClass: ['style-info'],
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
    };

    public success(message) {
        this._snackBar.open(message, 'X', this.configSuccess);
    }

    public error(message, action?) {
        this._snackBar.open(message, 'X', this.configError);
    }

    public warning(message) {
        this._snackBar.open(message, 'X', this.configWarning);
    }

    public info(message) {
        this._snackBar.open(message, 'X', this.configInfo);
    }

    public reaload() {
        location.reload();
    }
}
