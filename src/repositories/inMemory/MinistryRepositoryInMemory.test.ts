import { describe, expect, it } from 'vitest';

import { Ministry } from '../../entities';
import { ministryProps } from '../../tests/utils';
import { MinistryRepositoryInMemory } from './MinistryRepositoryInMemory';

const { name } = ministryProps;

describe('Testando MinistryRepositoryInMemory', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepositoryInMemory = new MinistryRepositoryInMemory();

    expect(ministryRepositoryInMemory).toBeInstanceOf(MinistryRepositoryInMemory);
  });

  it('Deve ser possível criar um ministério e retornar um Ministry.', async () => {
    const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    const ministries = ministryRepositoryInMemory.ministries;

    expect(ministries).toHaveLength(0);

    const ministryInitialQty = ministries.length;
    const createMinistry = await ministryRepositoryInMemory.create(ministry);

    expect(ministries).toHaveLength(ministryInitialQty + 1);
    expect(createMinistry).toBeInstanceOf(Ministry);
  });

  it('Deve ser possível encontrar um ministério pelo "id" e retornar um Ministry.', async () => {
    const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    const createMinistry = await ministryRepositoryInMemory.create(ministry);
    const ministryFound = await ministryRepositoryInMemory.findById(
      createMinistry.id as number
    );

    expect(ministryFound).toBe(createMinistry);
    expect(ministryFound).toBeInstanceOf(Ministry);
  });

  it('Deve ser possível encontrar um ministério pelo "name" e retornar um Ministry.', async () => {
    const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
    const ministry = new Ministry({ name });
    const createMinistry = await ministryRepositoryInMemory.create(ministry);
    const ministryFound = await ministryRepositoryInMemory.findByName(
      createMinistry.name
    );

    expect(ministryFound).toBe(createMinistry);
    expect(ministryFound).toBeInstanceOf(Ministry);
  });
});
