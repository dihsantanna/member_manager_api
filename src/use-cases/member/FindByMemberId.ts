import { StatusCodes as status } from 'http-status-codes';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

type FindByMemberIdRequest = number;

type FindByMemberIdResponse = Member | null;

export class FindByMemberId {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (id: FindByMemberIdRequest): Promise<FindByMemberIdResponse> {
    const member = await this.memberRepository.findById(id);

    if (!member) {
      throw new CustomError('Membro não encontrado.', status.NOT_FOUND);
    }

    return member;
  }
}
