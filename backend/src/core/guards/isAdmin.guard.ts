import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const adminToken = request.headers.authorization.split(' ')[1];
    return this.checkAdmin(adminToken);
  }

  checkAdmin(adminToken) {
    return adminToken === process.env.ADMIN_TOKEN;
  }
}
