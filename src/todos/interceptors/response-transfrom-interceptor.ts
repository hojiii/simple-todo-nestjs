import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

// {
//     message: '성공적으로 할일이 추가되었습니다.',
//     statusCode: 200,
//     data: createdTodo,
//   };

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private refelctor: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentStautsCode = context.switchToHttp().getResponse().statusCode;
    const messageFromMetaData = this.refelctor.get<string>(
      'response-message',
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => ({
        message: messageFromMetaData || data.message,
        statusCode: currentStautsCode,
        data: data.data || data,
      })),
    );
  }
}
