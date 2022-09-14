import { describe, expect, it } from 'vitest';

import { StatusCodes as status } from 'http-status-codes';
import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { OccupationRepositoryInMemory } from '../../repositories/in-memory';
import { occupationProps } from '../../tests/utils';
import { CreateOccupation } from './CreateOccupation';
import { FindMembersOfOccupation } from './FindMembersOfOccupation';

const { name } = occupationProps;

describe('Testando classe FindMembersOfOccupation', () => {
  it('Deve ser possível criar uma instância', () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const findMembersOfOccupation = new FindMembersOfOccupation(occupationRepository);

    expect(findMembersOfOccupation).toBeInstanceOf(FindMembersOfOccupation);
  });

  it('Deve ser possível encontrar os membros de um cargo, e retorna um array de Member', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const findMembersOfOccupation = new FindMembersOfOccupation(occupationRepository);

    const createOccupation = new CreateOccupation(occupationRepository);

    const occupation = await createOccupation.execute({ name });

    const members = await findMembersOfOccupation.execute(occupation.id as number);

    expect(members).toBeInstanceOf(Array);
    expect(members[0]).toBeInstanceOf(Member);
  });

  it('Deve retornar um erro caso o cargo não exista', async () => {
    const occupationRepository = new OccupationRepositoryInMemory();
    const findMembersOfOccupation = new FindMembersOfOccupation(occupationRepository);

    const occupation = await occupationRepository.create({ name });

    try {
      await findMembersOfOccupation.execute(occupation.id as number + 1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Cargo não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
