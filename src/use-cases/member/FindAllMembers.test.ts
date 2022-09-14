import { describe, expect, it } from 'vitest';
import { Member } from '../../entities';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';

import { FindAllMembers } from './FindAllMembers';

describe('Testando classe FindAllMembers', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const findAllMembers = new FindAllMembers(memberRepository);

    expect(findAllMembers).toBeInstanceOf(FindAllMembers);
  });

  it('Deve retornar um array de Member', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const createMember = new CreateMember(memberRepository);
    await createMember.execute(createMemberProps);

    const findAllMembers = new FindAllMembers(memberRepository);
    const members = await findAllMembers.execute();

    expect(members).toBeInstanceOf(Array);
    expect(members[0]).toBeInstanceOf(Member);
  });

  it('Deve retornar um array vazio caso não haja membros cadastrados', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const findAllMembers = new FindAllMembers(memberRepository);
    const members = await findAllMembers.execute();

    expect(members).toBeInstanceOf(Array);
    expect(members).toHaveLength(0);
  });
});
