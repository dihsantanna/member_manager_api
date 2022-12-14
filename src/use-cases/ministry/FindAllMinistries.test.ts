import { describe, expect, it } from 'vitest';

import { Ministry, MinistryWithMembersQty } from '../../entities';
import { MinistryRepositoryInMemory } from '../../repositories/in-memory';
import { ministryProps } from '../../tests/utils';
import { FindAllMinistries } from './FindAllMinistries';

const { name } = ministryProps;

describe('Testando classe FindAllMinistries', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const findAllMinistries = new FindAllMinistries(ministryRepository);

    expect(findAllMinistries).toBeInstanceOf(FindAllMinistries);
  });

  it('Deve ser possível encontrar todos os ministérios e retornar um array de MinistryWithMembersQty.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    await ministryRepository.create(ministry);
    const findAllMinistries = new FindAllMinistries(ministryRepository);

    const ministries = await findAllMinistries.execute();

    expect(ministries.length).toBe(ministryRepository.ministries.length);
    expect(ministries[0]).toBeInstanceOf(MinistryWithMembersQty);
  });

  it('Deve retornar um array vazio caso não haja ministérios cadastrados.', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const findAllMinistries = new FindAllMinistries(ministryRepository);

    const ministries = await findAllMinistries.execute();

    expect(ministries).toBeInstanceOf(Array);
    expect(ministries).toHaveLength(0);
  });
});
