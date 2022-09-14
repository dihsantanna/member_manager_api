import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

import { FindByMemberId } from './FindByMemberId';

describe('Testando classe FindByMemberId', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const findByMemberId = new FindByMemberId(memberRepository);

    expect(findByMemberId).toBeInstanceOf(FindByMemberId);
  });

  it('Deve retornar um Member', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    const findByMemberId = new FindByMemberId(memberRepository);
    const memberFound = await findByMemberId.execute(member.id as number);

    expect(memberFound).toBeInstanceOf(Member);
  });

  it('Deve retornar um erro caso o membro não seja encontrado.', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const findByMemberId = new FindByMemberId(memberRepository);

    try {
      await findByMemberId.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não encontrado.');
      expect((error as CustomError).statusCode).toBe(status.NOT_FOUND);
    }
  });
});
