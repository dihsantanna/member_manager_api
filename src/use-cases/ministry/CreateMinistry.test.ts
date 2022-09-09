import { StatusCodes as status } from 'http-status-codes/build/cjs/status-codes';
import { describe, expect, it } from 'vitest';

import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { MinistryRepositoryInMemory } from '../../repositories/inMemory';
import { ministryProps } from '../../tests/utils';
import { CreateMinistry } from './CreateMinistry';

const { name } = ministryProps;

describe('Testando classe CreateMinistry', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const createMinistry = new CreateMinistry(ministryRepository);

    expect(createMinistry).toBeInstanceOf(CreateMinistry);
  });

  it('Deve criar um ministério e retornar uma instância de Ministry', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const createMinistry = new CreateMinistry(ministryRepository);
    const ministry = await createMinistry.execute({ name });

    expect(ministry).toBeInstanceOf(Ministry);
    expect(ministry.name).toBe(name);
  });

  it('Deve lançar um erro caso o nome do ministério já exista', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const createMinistry = new CreateMinistry(ministryRepository);
    await createMinistry.execute({ name });

    try {
      await createMinistry.execute({ name });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Ministério já existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
