import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { configService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = String(
      request?.headers?.authorization || request?.headers?.Authorization || ''
    );

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token.');
    }

    const token = authHeader.substring(7, authHeader.length);
    const secret = configService.getSecret();
    const verified = jwt.verify(token, secret);

    if (!verified) {
      throw new UnauthorizedException('Invalid token.');
    }

    return true;
  }
}
