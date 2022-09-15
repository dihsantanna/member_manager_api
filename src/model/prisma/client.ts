import { Container, InjectionToken } from '@decorators/di';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const PRISMA_CLIENT = new InjectionToken('PRISMA_CLIENT');

Container.provide([{
  provide: PRISMA_CLIENT,
  useValue: prisma
}]);
