import { SetMetadata } from '@nestjs/common';

export const AllowedRoles = (...args: string[]) => SetMetadata('roles', args);
