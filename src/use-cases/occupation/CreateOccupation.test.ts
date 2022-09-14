import { StatusCodes as status } from 'http-status-codes/build/cjs/status-codes';
import { describe, expect, it } from 'vitest';

import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { OccupationRepositoryInMemory } from '../../repositories/in-memory';
import { occupationProps } from '../../tests/utils';
import { CreateOccupation } from './CreateOccupation';

const { name } = occupationProps;

describe('Testando classe CreateOccupation', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const createOccupation = new CreateOccupation(occupationRepository);

    expect(createOccupation).toBeInstanceOf(CreateOccupation);
  });

  it('Deve criar um cargo e retornar uma instância de Occupation', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const createOccupation = new CreateOccupation(occupationRepository);
    const occupation = await createOccupation.execute({ name });

    expect(occupation).toBeInstanceOf(Occupation);
    expect(occupation.name).toBe(name);
  });

  it('Deve lançar um erro caso o nome do cargo já exista', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const createOccupation = new CreateOccupation(occupationRepository);
    await createOccupation.execute({ name });

    try {
      await createOccupation.execute({ name });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Cargo já existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
