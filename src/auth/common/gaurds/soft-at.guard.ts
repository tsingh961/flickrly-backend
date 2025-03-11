import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class PublicPrivateGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      request.user = null;

      return true; // Allow the request to proceed, but user is null
    }

    return super.canActivate(context);
  }

  handleRequest(err, user): any {
    if (err || !user) {
      return null;
    }

    return user;
  }
}
