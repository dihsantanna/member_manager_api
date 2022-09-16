import { Container, InjectionToken } from '@decorators/di';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const MODEL = new InjectionToken('MODEL');

Container.provide([{
  provide: MODEL,
  useValue: prisma
}]);
