import { describe, expect, it } from 'vitest';

import { StatusCodes as status } from 'http-status-codes';
import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { MinistryRepositoryInMemory } from '../../repositories/in-memory';
import { ministryProps } from '../../tests/utils';
import { CreateMinistry } from './CreateMinistry';
import { FindMembersOfMinistry } from './FindMembersOfMinistry';

const { name } = ministryProps;

describe('Testando classe FindMembersOfMinistry', () => {
  it('Deve ser possível criar uma instância', () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const findMembersOfMinistry = new FindMembersOfMinistry(ministryRepository);

    expect(findMembersOfMinistry).toBeInstanceOf(FindMembersOfMinistry);
  });

  it('Deve ser possível encontrar os membros de um ministério, e retorna um array de Member', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const findMembersOfMinistry = new FindMembersOfMinistry(ministryRepository);

    const createMinistry = new CreateMinistry(ministryRepository);

    const ministry = await createMinistry.execute({ name });

    const members = await findMembersOfMinistry.execute(ministry.id as number);

    expect(members).toBeInstanceOf(Array);
    expect(members[0]).toBeInstanceOf(Member);
  });

  it('Deve retornar um erro caso o ministério não exista', async () => {
    const ministryRepository = new MinistryRepositoryInMemory();
    const findMembersOfMinistry = new FindMembersOfMinistry(ministryRepository);

    const ministry = await ministryRepository.create({ name });

    try {
      await findMembersOfMinistry.execute(ministry.id as number + 1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Ministério não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
