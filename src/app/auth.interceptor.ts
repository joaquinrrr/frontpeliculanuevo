import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = (typeof window !== 'undefined') ? sessionStorage.getItem('token') : null;
    

    if (token) {
      if (!token.startsWith('Bearer ')) {
        token = `Bearer ${token}`;
      }
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
