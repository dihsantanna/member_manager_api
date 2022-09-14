import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { MinistryRepositoryInMemory } from '../../repositories/in-memory';
import { ministryProps } from '../../tests/utils';

import { DeleteMinistry } from './DeleteMinistry';

const { name } = ministryProps;

describe('Testando classe DeleteMinistry', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const deleteMinistry = new DeleteMinistry(ministryRepository);

    expect(deleteMinistry).toBeInstanceOf(DeleteMinistry);
  });

  it('Deve ser possível deletar um ministério e retornar um Ministry.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    const ministryCreated = await ministryRepository.create(ministry);
    const deleteMinistry = new DeleteMinistry(ministryRepository);

    const ministryDeleted = await deleteMinistry.execute({ id: ministryCreated.id as number });

    expect(ministryRepository.ministries).not.toContainEqual(ministryDeleted);
    expect(ministryDeleted).toBeInstanceOf(Ministry);
  });

  it('Deve retornar um erro caso o ministério não exista.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const deleteMinistry = new DeleteMinistry(ministryRepository);

    try {
      await deleteMinistry.execute({ id: 1 });
    } catch (error) {
      expect((error as CustomError).message).toBe('Ministério não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
