import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor<T> implements NestInterceptor<T, T> {
  constructor(private errorMessage: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      tap((data) => {
        if (!data) {
          throw new NotFoundException(this.errorMessage);
        }
      })
    );
  }
}
