// import { Injectable, LoggerService } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
// import { format, transports } from 'winston';
// import 'winston-daily-rotate-file';

// @Injectable()
// export class CustomLoggerService implements LoggerService {
//   private readonly _logger;

//   constructor() {
//     this._logger = WinstonModule.createLogger({
//       transports: [
//         new transports.DailyRotateFile({
//           datePattern: 'YYYY-MM-DD',
//           filename: 'logs/error/%DATE%-error.log',
//           format: format.combine(
//             format.timestamp(),
//             format.errors({ stack: true }),
//             format.json({ space: 2 }),
//             format.printf((info) => {
//               return JSON.stringify({
//                 timestamp: info.timestamp,
//                 level: info.level,
//                 message: info.message,
//                 context: info.context,
//                 error: info.error,
//               });
//             }),
//           ),
//           json: true,
//           level: 'error',
//           maxFiles: '30d',
//           zippedArchive: true,
//         }),
//         new transports.DailyRotateFile({
//           datePattern: 'YYYY-MM-DD',
//           filename: 'logs/combined/%DATE%-combined.log',
//           format: format.combine(
//             format.timestamp(),
//             format.errors({ stack: true }),
//             format.json({ space: 2 }),
//             format.printf((info) => {
//               return JSON.stringify({
//                 timestamp: info.timestamp,
//                 level: info.level,
//                 message: info.message,
//                 context: info.context,
//               });
//             }),
//           ),
//           json: true,
//           maxFiles: '7d',
//           zippedArchive: true,
//         }),
//         new transports.DailyRotateFile({
//           datePattern: 'YYYY-MM-DD',
//           filename: 'logs/debug/%DATE%-debug.log',
//           format: format.combine(
//             format.timestamp(),
//             format.json({ space: 2 }),
//             format.printf((info) => {
//               return JSON.stringify({
//                 timestamp: info.timestamp,
//                 level: info.level,
//                 message: info.message,
//                 context: info.context,
//               });
//             }),
//           ),
//           json: true,
//           level: 'debug',
//           maxFiles: '7d',
//           zippedArchive: true,
//         }),
//         new transports.Console({
//           format: format.combine(
//             format((info) => ({
//               ...info,
//               level: info.level.toUpperCase(),
//             }))(),
//             format.cli(),
//             format.align(),
//             format.splat(),
//             format.colorize({ all: true }),
//             format.prettyPrint({ colorize: true }),
//             format.timestamp(),
//             format.json({ space: 2 }),
//             format.printf(({ context, level, message, timestamp, trace }) => {
//               return `${timestamp} ${context ? `[${context}]` : ''} ${level}: ${message}${trace ? `\n${trace}` : ''}`;
//             }),
//           ),
//           level: process.env.LOG_LEVEL_TERMINAL,
//         }),
//       ],
//     });
//   }

//   debug(message: string, context?: string): void {
//     this._logger.debug({ context, message });
//   }

//   error(message: string, trace?: string, context?: string): void {
//     this._logger.error({ context, message, trace });
//   }

//   log(message: string, context?: string): void {
//     this._logger.log({ context, message });
//   }

//   verbose(message: string, context?: string): void {
//     this._logger.verbose({ context, message });
//   }

//   warn(message: string, context?: string): void {
//     this._logger.warn({ context, message });
//   }
// }
