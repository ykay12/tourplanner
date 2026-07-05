import { HttpInterceptorFn } from '@angular/common/http';

//HTTP-Interceptor: hängt den gespeicherten Token automatisch als Bearer-Header an jeden Backend-Request an
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return next(req);
    }

    return next(
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    );
};