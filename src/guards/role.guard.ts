import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('user is not defined');
    }
    if (user.role !== 'superadmin') {
      throw new ForbiddenException('this action only open for superadmins');
    }
    return true;
  }
}
