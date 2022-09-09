import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { OccupationRepositoryInMemory } from '../../repositories/inMemory';
import { occupationProps } from '../../tests/utils';
import { UpdateOccupation } from './UpdateOccupation';

const { name } = occupationProps;

const updatedName = `${name} Unitários`;

describe('Testando classe UpdateOccupation', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const updateOccupation = new UpdateOccupation(occupationRepository);

    expect(updateOccupation).toBeInstanceOf(UpdateOccupation);
  });

  it('Deve ser possível atualizar um cargo e retornar um objeto de Occupation.', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    const occupationCreated = await occupationRepository.create(occupation);

    expect(occupationCreated.name).toBe(name);

    const updateOccupation = new UpdateOccupation(occupationRepository);
    const occupationUpdated = await updateOccupation.execute({
      id: occupationCreated.id as number,
      data: { name: updatedName }
    });

    expect(occupationUpdated).toBeInstanceOf(Occupation);
    expect(occupationUpdated.id).toBe(occupationCreated.id);
    expect(occupationUpdated.name).toBe(updatedName);
  });

  it('Deve retornar um erro caso o cargo não exista.', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const updateOccupation = new UpdateOccupation(occupationRepository);

    try {
      await updateOccupation.execute({
        id: 1,
        data: { name: updatedName }
      });
    } catch (error) {
      expect((error as CustomError).message).toBe('Cargo não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
