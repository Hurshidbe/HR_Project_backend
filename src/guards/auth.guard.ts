import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Http2ServerRequest } from 'http2';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException(
        'Authorization header is not defined or incorrect',
      );
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.jwt.verifyAsync(token);
      req.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException('token expired or invalid', 401);
    }
  }
}
