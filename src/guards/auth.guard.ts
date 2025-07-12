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
    const token = req.cookies.authToken;
    if (!token) throw new BadRequestException("token yo'q");
    try {
      const decoded = await this.jwt.verifyAsync(token);
      req.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException('token expired', 402);
    }
  }
}
