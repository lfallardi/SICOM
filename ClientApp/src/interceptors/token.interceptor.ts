import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { InternalUser } from 'src/app/internalUser/model/internalUser';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.search('A1ED55A6169B8AC16388A81F89C3E59B1F9F8DC6A3BFD38F483598A899') === -1 && request.url.search('register')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storage.get('jwt')}`
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'api-key': ''
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['login']);
        }
        if (err.status === 404) {
          this.router.navigate(['error']);
        }
        if (err.status === 500) {
          // this.errorDialogService.openDialog(err.error);
        }
        if (err.status === 400) {
          // this.errorDialogService.openDialog(err.error);
        }
      }
    });
  }

}
