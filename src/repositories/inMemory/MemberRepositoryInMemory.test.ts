import { describe, expect, it } from 'vitest';

import { Member, Ministry, Occupation } from '../../entities';
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

    const memberCreated = await memberRepositoryInMemory.create(member);
    const memberFound = await memberRepositoryInMemory.findById(memberCreated.id as number);

    expect(memberFound).toBeInstanceOf(Member);
    expect(memberFound?.id).toBe(memberCreated.id);
  });

  it('Deve ser possível encontrar todos os membros.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    await memberRepositoryInMemory.create(member);
    const membersFound = await memberRepositoryInMemory.findAll();

    expect(membersFound).toBeInstanceOf(Array);
    expect(membersFound[0]).toBeInstanceOf(Member);
  });

  it('Deve ser possível encontrar os ministérios de um membro, deve retornar um array de Ministry.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);
    const ministries = await memberRepositoryInMemory.findMemberMinistry(memberCreated.id as number);

    expect(ministries).toBeInstanceOf(Array);
    expect((ministries as Ministry[])[0]).toBeInstanceOf(Ministry);
  });

  it('Deve retornar nulo caso id de membro não exista', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();

    const ministries = await memberRepositoryInMemory.findMemberMinistry(1);

    expect(ministries).toBeNull();
  });

  it('Deve ser possível encontrar os cargos de um membro, deve retornar um array de Occupation.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);
    const occupations = await memberRepositoryInMemory.findMemberOccupation(memberCreated.id as number);

    expect(occupations).toBeInstanceOf(Array);
    expect((occupations as Occupation[])[0]).toBeInstanceOf(Occupation);
  });

  it('Deve retornar nulo caso id de membro não exista', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();

    const occupations = await memberRepositoryInMemory.findMemberOccupation(1);

    expect(occupations).toBeNull();
  });

  it('Deve ser possível atualizar um membro.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);
    const memberUpdated = await memberRepositoryInMemory.update(memberCreated.id as number, {
      city: 'Cidade dos Testes'
    });

    expect(memberUpdated).toBeInstanceOf(Member);
    expect(memberCreated.id).toBe(memberUpdated.id);
    expect(memberCreated.city).toBe('Cidade dos Tests');
    expect(memberUpdated.city).toBe('Cidade dos Testes');
  });

  it('Deve ser possível atualizar os ministérios de um membro, e retornar um array de Ministry.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);
    const memberMinistryUpdated = await memberRepositoryInMemory.updateMemberInMinistry(memberCreated.id as number, [1]);

    expect(memberMinistryUpdated).toBeInstanceOf(Array);
    expect((memberMinistryUpdated as Ministry[])[0]).toBeInstanceOf(Ministry);
    expect(memberCreated.ministries).toHaveLength(2);
    expect((memberMinistryUpdated as Ministry[])[0].id).toBe(1);
    expect(memberMinistryUpdated).toHaveLength(1);
  });

  it('Deve retornar nulo caso membro não exista', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();

    const memberMinistryUpdated = await memberRepositoryInMemory.updateMemberInMinistry(1, [1]);

    expect(memberMinistryUpdated).toBeNull();
  });

  it('Deve ser possível atualizar os cargos de um membro, e retornar um array de Occupation.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);
    const memberOccupationUpdated = await memberRepositoryInMemory.updateMemberInOccupation(memberCreated.id as number, [1]);

    expect(memberOccupationUpdated).toBeInstanceOf(Array);
    expect((memberOccupationUpdated as Occupation[])[0]).toBeInstanceOf(Occupation);
    expect(memberCreated.occupations).toHaveLength(2);
    expect((memberOccupationUpdated as Occupation[])[0].id).toBe(1);
    expect(memberOccupationUpdated).toHaveLength(1);
  });

  it('Deve retornar nulo caso membro não exista', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();

    const memberMinistryUpdated = await memberRepositoryInMemory.updateMemberInOccupation(1, [1]);

    expect(memberMinistryUpdated).toBeNull();
  });

  it('Deve ser possível deletar um membro.', async () => {
    const memberRepositoryInMemory = new MemberRepositoryInMemory();
    const member = new Member(createMemberProps);

    const memberCreated = await memberRepositoryInMemory.create(member);

    expect(memberRepositoryInMemory.members).toHaveLength(1);

    const memberDeleted = await memberRepositoryInMemory.delete(memberCreated.id as number);

    expect(memberDeleted).toBeInstanceOf(Member);
    expect(memberCreated.id).toBe(memberDeleted.id);
    expect(memberRepositoryInMemory.members).toHaveLength(0);
  });
});
