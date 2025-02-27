// /* eslint-disable prettier/prettier */
// import { ApiConfigService } from '@core/config/config.service';
// import {
//   TApiResponse,
//   TResponse,
//   TSuccessResponse,
// } from '@core/types/response';
// // import { TApiResponse, TResponse } from '@core/types/response';
// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   RequestTimeoutException,
// } from '@nestjs/common';
// import { TimeoutError, throwError } from 'rxjs';
// import { catchError, map, timeout } from 'rxjs/operators';

// @Injectable()
// export class ResponseInterceptor implements NestInterceptor {
//   private readonly _isLocal: boolean;
//   constructor(private readonly _apiConfigService: ApiConfigService) {
//     this._isLocal =
//       this._apiConfigService.environment.nodeEnv !==
//       this._apiConfigService.environment.prod;
//   }
//   intercept(context: ExecutionContext, next: CallHandler): any {
//     return next.handle().pipe(
//       timeout(10000),
//       map((res: TApiResponse) => {
//         return this.responseHandler(res, context);
//       }),
//       catchError((err) => {
//         if (err instanceof TimeoutError) {
//           return throwError(() => new RequestTimeoutException());
//         }
//         throw err; // Re-throw the error if it's not a TimeoutError
//       }),
//     );
//   }

//   responseHandler(
//     res: TApiResponse,
//     context: ExecutionContext,
//   ): TResponse<TSuccessResponse> {
//     const ctx = context.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     const path = request.url;
//     const statusCode = res.statusCode || response.statusCode;
//     // if (
//     //   typeof res?.data !== 'object' ||
//     //   Array.isArray(res?.data) ||
//     //   Object.keys(res?.data).length === 0
//     // ) {
//     //   throw new InternalServerErrorException(
//     //     this._isLocal
//     //       ? 'Invalid or empty data returned. Please check the return data provided by the controller'
//     //       : 'Invalid data returned',
//     //   );
//     // }
//     const finalResponse: TResponse<TSuccessResponse> = {
//       data: res?.data,
//       message: res?.message,
//       path: this._isLocal ? path : undefined,
//       statusCode: statusCode,
//       success: res?.success ?? res.success ?? true,
//       timestamp: new Date().toISOString(),
//       metadata: res,
//     };

//     return finalResponse;
//   }
// }
