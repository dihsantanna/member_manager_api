import { describe, expect, it } from 'vitest';

import { Occupation } from '../../entities';
import { occupationProps } from '../../tests/utils';
import { OccupationRepositoryInMemory } from './OccupationRepositoryInMemory';

const { name } = occupationProps;

describe('Testando OccupationRepositoryInMemory', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();

    expect(occupationRepositoryInMemory).toBeInstanceOf(OccupationRepositoryInMemory);
  });

  it('Deve ser possível criar um cargo e retornar um Occupation.', async () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    const occupations = occupationRepositoryInMemory.occupations;

    expect(occupations).toHaveLength(0);

    const occupationInitialQty = occupations.length;
    const createOccupation = await occupationRepositoryInMemory.create(occupation);

    expect(occupations).toHaveLength(occupationInitialQty + 1);
    expect(createOccupation).toBeInstanceOf(Occupation);
  });

  it('Deve ser possível encontrar um cargo pelo "id" e retornar um Occupation.', async () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    const createOccupation = await occupationRepositoryInMemory.create(occupation);
    const occupationFound = await occupationRepositoryInMemory.findById(
      createOccupation.id as number
    );

    expect(occupationFound).toBe(createOccupation);
    expect(occupationFound).toBeInstanceOf(Occupation);
  });

  it('Deve ser possível encontrar um ministério pelo "name" e retornar um Occupation.', async () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    const createOccupation = await occupationRepositoryInMemory.create(occupation);
    const occupationFound = await occupationRepositoryInMemory.findByName(
      createOccupation.name
    );

    expect(occupationFound).toBe(createOccupation);
    expect(occupationFound).toBeInstanceOf(Occupation);
  });

  it('Deve ser possível encontrar todos os ministérios e retornar um array de Occupation.', async () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    await occupationRepositoryInMemory.create(occupation);
    const occupations = await occupationRepositoryInMemory.findAll();

    expect(occupations.length).toBe(occupationRepositoryInMemory.occupations.length);
    expect(occupations[0]).toBeInstanceOf(Occupation);
  });
});
