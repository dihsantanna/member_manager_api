import { describe, expect, it } from 'vitest';

import { Member } from '../../entities';
import { createMemberProps } from '../../tests/utils';
import { MemberRepositoryInMemory } from './MemberRepositoryInMemory';

describe('Testando MemberRepositoryInMemory', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();

    expect(memberRepositoryInMemory).toBeInstanceOf(MemberRepositoryInMemory);
  });

  it('Deve ser possível criar um membro e retornar um Member.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);
    const members = memberRepositoryInMemory.members;

    expect(members).toHaveLength(0);

    const memberInitialQty = members.length;
    const createMember = await memberRepositoryInMemory.create(member);

    expect(members).toHaveLength(memberInitialQty + 1);
    expect(createMember).toBeInstanceOf(Member);
  });

  it('Deve ser possível encontrar um membro pelo e-mail.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    await memberRepositoryInMemory.create(member);
    const memberFound = await memberRepositoryInMemory.findByEmail(member.email as string);

    expect(memberFound).toBeInstanceOf(Member);
  });

  it('Deve ser possível encontrar um membro pelo id.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    await memberRepositoryInMemory.create(member);
    const memberFound = await memberRepositoryInMemory.findById(1);

    expect(memberFound).toBeInstanceOf(Member);
    expect(memberFound?.id).toBe(1);
  });

  it('Deve ser possível encontrar todos os membros.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    await memberRepositoryInMemory.create(member);
    const membersFound = await memberRepositoryInMemory.findAll();

    expect(membersFound).toBeInstanceOf(Array);
    expect(membersFound[0]).toBeInstanceOf(Member);
  });
});
