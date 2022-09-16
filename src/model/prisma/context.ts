import { Container, InjectionToken } from '@decorators/di';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

export type Model = PrismaClient;

export type MockModel = DeepMockProxy<PrismaClient>;

export const model: Model = new PrismaClient();

export const createMockModel = (): MockModel => {
  return mockDeep<PrismaClient>();
};

export const MODEL = new InjectionToken('MODEL');

Container.provide([{
  provide: MODEL,
  useValue: model
}]);
