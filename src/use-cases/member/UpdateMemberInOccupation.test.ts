import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { Member, Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { MemberRepositoryInMemory } from '../../repositories/in-memory';
import { createMemberProps } from '../../tests/utils';
import { CreateMember } from './CreateMember';
import { UpdateMemberInOccupation } from './UpdateMemberInOccupation';

describe('Testando classe UpdateMemberInOccupation', () => {
  it('Deve ser possível criar uma instância.', () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInOccupation = new UpdateMemberInOccupation(memberRepository);

    expect(updateMemberInOccupation).toBeInstanceOf(UpdateMemberInOccupation);
  });

  it('Deve ser possível atualizar os cargos de um membro, e retorna um array de Occupation.', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInOccupation = new UpdateMemberInOccupation(memberRepository);

    const member = new Member(createMemberProps);

    const createMember = new CreateMember(memberRepository);
    const memberCreated = await createMember.execute(member);

    const memberOccupations = await updateMemberInOccupation.execute({ id: memberCreated.id as number, data: [1] });

    expect(memberOccupations).toBeInstanceOf(Array);
    expect(memberOccupations[0]).toBeInstanceOf(Occupation);
    expect(memberOccupations).toHaveLength(1);
    expect(memberOccupations[0].id).toBe(1);
  });

  it('Deve retornar um erro caso o membro não exista.', async () => {
    const memberRepository = new MemberRepositoryInMemory();
    const updateMemberInOccupation = new UpdateMemberInOccupation(memberRepository);

    try {
      await updateMemberInOccupation.execute({ id: 1, data: [1] });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Membro não existe.');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
