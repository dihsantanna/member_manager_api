import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

export interface Context {
  prisma: PrismaClient
};

export interface MockContext {
  prisma: DeepMockProxy<PrismaClient>
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>()
  };
};
