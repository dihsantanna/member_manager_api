import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member, Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';
import { UpdateMemberInMinistry } from './UpdateMemberInMinistry';

describe('Testando classe UpdateMemberInMinistry', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInMinistry = new UpdateMemberInMinistry(memberRepository);

    expect(updateMemberInMinistry).toBeInstanceOf(UpdateMemberInMinistry);
  });

  it('Deve ser possível atualizar os ministérios de um membro, e retorna um array de Ministry.', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInMinistry = new UpdateMemberInMinistry(memberRepository);

    const member = new Member(createMemberProps);

    const createMember = new CreateMember(memberRepository);
    const memberCreated = await createMember.execute(member);

    const memberMinistries = await updateMemberInMinistry.execute({ id: memberCreated.id as number, data: [1] });

    expect(memberMinistries).toBeInstanceOf(Array);
    expect(memberMinistries[0]).toBeInstanceOf(Ministry);
    expect(memberMinistries).toHaveLength(1);
    expect(memberMinistries[0].id).toBe(1);
  });

  it('Deve retornar um erro caso o membro não exista.', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInMinistry = new UpdateMemberInMinistry(memberRepository);

    try {
      await updateMemberInMinistry.execute({ id: 1, data: [1] });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });

  it('Deve retornar um array caso membro seja removido de todos os ministérios', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInMinistry = new UpdateMemberInMinistry(memberRepository);

    const member = new Member(createMemberProps);

    const createMember = new CreateMember(memberRepository);
    const memberCreated = await createMember.execute(member);

    const memberMinistries = await updateMemberInMinistry.execute({ id: memberCreated.id as number, data: [] });

    expect(memberMinistries).toBeInstanceOf(Array);
    expect(memberMinistries).toHaveLength(0);
  });
});
