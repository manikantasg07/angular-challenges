import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong';
      if (error.status === 0) message = 'Network error. Check your connection.';
      else if (error.status === 404) message = 'Not found';
      else if (error.status >= 500) message = 'Server error';

      console.error(message, error);
      return throwError(() => error);
    }),
  );
};