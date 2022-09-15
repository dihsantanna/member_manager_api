import { Container, InjectionToken } from '@decorators/di';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const PRISMA_CLIENTE = new InjectionToken('PRISMA_MODEL');

Container.provide([{
  provide: PRISMA_CLIENTE,
  useValue: prisma
}]);
