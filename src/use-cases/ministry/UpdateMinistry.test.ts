import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';

import { MinistryRepositoryInMemory } from '../../repositories/in-memory';
import { ministryProps } from '../../tests/utils';
import { UpdateMinistry } from './UpdateMinistry';

const { name } = ministryProps;

const updatedName = `${name} Unitários`;

describe('Testando classe UpdateMinistry', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const updateMinistry = new UpdateMinistry(ministryRepository);

    expect(updateMinistry).toBeInstanceOf(UpdateMinistry);
  });

  it('Deve ser possível atualizar um ministério e retornar um objeto de Ministry.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    const ministryCreated = await ministryRepository.create(ministry);

    expect(ministryCreated.name).toBe(name);

    const updateMinistry = new UpdateMinistry(ministryRepository);
    const ministryUpdated = await updateMinistry.execute({
      id: ministryCreated.id as number,
      data: { name: updatedName }
    });

    expect(ministryUpdated).toBeInstanceOf(Ministry);
    expect(ministryUpdated.id).toBe(ministryCreated.id);
    expect(ministryUpdated.name).toBe(updatedName);
  });

  it('Deve retornar um erro caso o ministério não exista.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const updateMinistry = new UpdateMinistry(ministryRepository);

    try {
      await updateMinistry.execute({
        id: 1,
        data: { name: updatedName }
      });
    } catch (error) {
      expect((error as CustomError).message).toBe('Ministério não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
