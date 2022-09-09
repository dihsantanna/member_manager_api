import { describe, expect, it } from 'vitest';

import { Occupation } from '../../entities';
import { OccupationRepositoryInMemory } from '../../repositories/inMemory';
import { occupationProps } from '../../tests/utils';
import { FindAllOccupations } from './FindAllOccupations';

const { name } = occupationProps;

describe('Testando classe FindAllOccupations', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const findAllOccupations = new FindAllOccupations(occupationRepository);

    expect(findAllOccupations).toBeInstanceOf(FindAllOccupations);
  });

  it('Deve ser possível encontrar todos os cargos e retornar um array de Occupation.', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const occupation = new Occupation({ name });
    await occupationRepository.create(occupation);
    const findAllOccupations = new FindAllOccupations(occupationRepository);

    const occupations = await findAllOccupations.execute();

    expect(occupations.length).toBe(occupationRepository.occupations.length);
    expect(occupations[0]).toBeInstanceOf(Occupation);
  });
});
