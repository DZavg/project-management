import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Role from '@/roles/role.enum';
import { ROLES_KEY } from '@/roles/roles.decorator';
import { UnauthorizedException } from '@/utils/exception/unauthorizedException';
import { ForbiddenException } from '@/utils/exception/forbiddenException';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException();
    }

    const includesRequiredRole = requiredRoles.some(
      (role) => user.roles?.includes(role),
    );

    if (!includesRequiredRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}
