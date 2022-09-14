import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { OccupationRepositoryInMemory } from '../../repositories/in-memory';
import { occupationProps } from '../../tests/utils';

import { DeleteOccupation } from './DeleteOccupation';

const { name } = occupationProps;

describe('Testando classe DeleteOccupation', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const deleteOccupation = new DeleteOccupation(occupationRepository);

    expect(deleteOccupation).toBeInstanceOf(DeleteOccupation);
  });

  it('Deve ser possível deletar um cargo e retornar um Occupation.', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    const occupationCreated = await occupationRepository.create(occupation);
    const deleteOccupation = new DeleteOccupation(occupationRepository);

    const occupationDeleted = await deleteOccupation.execute({ id: occupationCreated.id as number });

    expect(occupationRepository.occupations).not.toContainEqual(occupationDeleted);
    expect(occupationDeleted).toBeInstanceOf(Occupation);
  });

  it('Deve retornar um erro caso o cargo não exista.', async () => {
    const ministryRepository = new OccupationRepositoryInMemory();
    const deleteOccupation = new DeleteOccupation(ministryRepository);

    try {
      await deleteOccupation.execute({ id: 1 });
    } catch (error) {
      expect((error as CustomError).message).toBe('Cargo não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
