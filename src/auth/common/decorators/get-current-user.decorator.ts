import { JwtPayload } from '@auth/interface/auth.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
