import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

import { FindMemberMinistry } from './FindMemberMinistry';

describe('Testando classe FindMemberMinistry', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const findMemberMinistry = new FindMemberMinistry(memberRepository);

    expect(findMemberMinistry).toBeInstanceOf(FindMemberMinistry);
  });

  it('Deve retornar um array de Ministry', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    const findMemberMinistry = new FindMemberMinistry(memberRepository);
    const ministries = await findMemberMinistry.execute(member.id as number);

    expect(ministries).toBeInstanceOf(Array);
    expect(ministries[0]).toBeInstanceOf(Ministry);
  });

  it('Deve retornar um erro caso o membro não seja encontrado.', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const findMemberMinistry = new FindMemberMinistry(memberRepository);

    try {
      await findMemberMinistry.execute(2);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });

  it('Deve retornar um array vazio caso o membro não esteja em nenhum ministério.', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    const member = await createMember.execute(createMemberProps);

    memberRepository.memberMinistry = [];

    const findMemberMinistry = new FindMemberMinistry(memberRepository);
    const ministries = await findMemberMinistry.execute(member.id as number);

    expect(ministries).toBeInstanceOf(Array);
    expect(ministries).toHaveLength(0);
  });
});
