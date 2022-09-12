import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

type FindByMemberIdRequest = number;

type FindByMemberIdResponse = Member | null;

@Injectable()
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

export const FIND_BY_MEMBER_ID = new InjectionToken('FIND_BY_MEMBER_ID');

Container.provide([{
  provide: FIND_BY_MEMBER_ID,
  useClass: FindByMemberId
}]);
