import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../types/common.types';
import { UserRole } from '../enums/enums';
import { MESSAGES } from '../constants/app.constants';

/**
 * Guard to verify user roles and permissions
 */
@Injectable()
export class RoleGuard implements CanActivate {
  private readonly allowedRoles: string[] = [UserRole.SUPER_ADMIN];

  /**
   * Validates user role permissions
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (!this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException(
        'This operation is restricted to super administrators only',
      );
    }

    return true;
  }

  /**
   * Check if user has specific role
   */
  static hasRole(userRole: string, requiredRole: string): boolean {
    return userRole === requiredRole;
  }

  /**
   * Check if user is super admin
   */
  static isSuperAdmin(userRole: string): boolean {
    return userRole === UserRole.SUPER_ADMIN;
  }
}
