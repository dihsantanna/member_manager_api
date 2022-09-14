import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

import { FindMemberOccupation } from './FindMemberOccupation';

describe('Testando classe FindMemberOccupation', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const findMemberOccupation = new FindMemberOccupation(memberRepository);

    expect(findMemberOccupation).toBeInstanceOf(FindMemberOccupation);
  });

  it('Deve retornar um array de Occupation', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    const findMemberOccupation = new FindMemberOccupation(memberRepository);
    const occupations = await findMemberOccupation.execute(member.id as number);

    expect(occupations).toBeInstanceOf(Array);
    expect(occupations[0]).toBeInstanceOf(Occupation);
  });

  it('Deve retornar um erro caso o membro não seja encontrado.', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const findMemberOccupation = new FindMemberOccupation(memberRepository);

    try {
      await findMemberOccupation.execute(2);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
