import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BadResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => {
          // if (event instanceof HttpResponse) {
          // }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (
              this.cliendErrorStatusCode(err.status) ||
              this.serverErrorStatusCode(err.status)
            ) {
              console.error(
                `Status code: ${err.status}. Message: ${err.message}`
              );
            }
          } else {
            console.error(err);
          }
        }
      )
    );
  }

  private cliendErrorStatusCode(statusCode: number): boolean {
    return statusCode >= 400 && statusCode <= 499;
  }

  private serverErrorStatusCode(statusCode: number): boolean {
    return statusCode >= 500 && statusCode <= 599;
  }
}
