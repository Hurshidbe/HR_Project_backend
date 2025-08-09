import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types/common.types';
import { AUTH, MESSAGES } from '../constants/app.constants';

/**
 * Guard to verify JWT authentication tokens
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Validates the JWT token and attaches user data to request
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(MESSAGES.UNAUTHORIZED);
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.TOKEN_EXPIRED);
    }
  }

  /**
   * Extracts JWT token from Authorization header
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith(AUTH.BEARER_PREFIX)) {
      return undefined;
    }

    return authHeader.substring(AUTH.BEARER_PREFIX.length);
  }
}
