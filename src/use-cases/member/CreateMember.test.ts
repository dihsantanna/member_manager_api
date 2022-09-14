import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

const { fullName, email } = createMemberProps;

describe('Testando classe CreateMember', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const createMember = new CreateMember(memberRepository);

    expect(createMember).toBeInstanceOf(CreateMember);
  });

  it('Deve criar um membro e retornar uma instância de Member', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    expect(member).toBeInstanceOf(Member);
    expect(member.fullName).toBe(fullName);
    expect(member.email).toBe(email);
  });

  it('Deve lançar um erro caso o e-mail do membro já exista', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const createMember = new CreateMember(memberRepository);
    await createMember.execute(createMemberProps);

    try {
      await createMember.execute(createMemberProps);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro possui e-mail já cadastrado.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
