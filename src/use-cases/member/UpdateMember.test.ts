import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/inMemory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';
import { UpdateMember } from './UpdateMember';

describe('Testando classe UpdateMember', () => {
  it('Deve ser possível criar uma instância', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMember = new UpdateMember(memberRepository);

    expect(updateMember).toBeInstanceOf(UpdateMember);
  });

  it('Deve atualizar um membro e retornar uma instância de Member', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const member = new Member(createMemberProps);
    const createMember = new CreateMember(memberRepository);
    const createdMember = await createMember.execute(member);

    const updateMember = new UpdateMember(memberRepository);
    const updatedMember = await updateMember.execute(
      { id: createdMember.id as number, data: { city: 'Cidade dos Testes' } }
    );

    expect(updatedMember).toBeInstanceOf(Member);
    expect(createdMember.id).toBe(updatedMember.id);
    expect(createdMember.city).toBe('Cidade dos Tests');
    expect(updatedMember.city).toBe('Cidade dos Testes');
  });

  it('Deve retornar erro caso o membro não exista', async () => {
    const memberRepository = new MemberRepositoryInMemory();

    const updateMember = new UpdateMember(memberRepository);

    try {
      await updateMember.execute(
        { id: 1, data: { city: 'Cidade dos Testes' } }
      );
    } catch (error) {
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
      expect((error as CustomError).message).toBe('Membro não existe.');
    }
  });
});
