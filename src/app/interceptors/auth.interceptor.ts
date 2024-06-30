import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UiService } from '../components/ui/ui.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private uiService: UiService,
    private authService: AuthService,
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log("TEST interceptor");
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      this.uiService.countRequestDown();
      this.uiService.showError("Zabranjen pristup.");

      this.authService.logout();

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }

    if (err.status === 500) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška u komunikaciji sa serverom.");

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }

    if (err.status === 404) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška u komunikaciji sa serverom. Resurs nije pronađen.");

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }

    return throwError(() => new Error(err.message));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(req).pipe(catchError(x => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }
}

