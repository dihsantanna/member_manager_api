import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

import { DeleteMember } from './DeleteMember';

describe('Testando classe DeleteMember', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const deleteMember = new DeleteMember(memberRepository);

    expect(deleteMember).toBeInstanceOf(DeleteMember);
  });

  it('Deve retornar um Member', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    const deleteMember = new DeleteMember(memberRepository);
    const memberDeleted = await deleteMember.execute(member.id as number);

    expect(memberDeleted).toBeInstanceOf(Member);
  });

  it('Deve retornar um erro caso o membro não seja encontrado.', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const deleteMember = new DeleteMember(memberRepository);

    try {
      await deleteMember.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
