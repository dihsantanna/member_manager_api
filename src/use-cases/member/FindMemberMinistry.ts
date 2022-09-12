import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes } from 'http-status-codes';

import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

type FindMemberMinistryRequest = number;

type FindMemberMinistryResponse = Ministry[];

@Injectable()
export class FindMemberMinistry {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (
    id: FindMemberMinistryRequest
  ): Promise<FindMemberMinistryResponse> {
    const ministries = await this.memberRepository.findMemberMinistry(id);

    if (!ministries) {
      throw new CustomError('Membro não encontrado.', StatusCodes.BAD_REQUEST);
    }

    return ministries;
  }
}

export const FIND_MEMBER_MINISTRY = new InjectionToken('FIND_MEMBER_MINISTRY');

Container.provide([{
  provide: FIND_MEMBER_MINISTRY,
  useClass: FindMemberMinistry
}]);
