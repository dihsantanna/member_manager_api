import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes } from 'http-status-codes';

import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

type FindMemberOccupationRequest = number;

type FindMemberOccupationResponse = Occupation[];

@Injectable()
export class FindMemberOccupation {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (
    id: FindMemberOccupationRequest
  ): Promise<FindMemberOccupationResponse> {
    const ministries = await this.memberRepository.findMemberOccupation(id);

    if (!ministries) {
      throw new CustomError('Membro não existe.', StatusCodes.BAD_REQUEST);
    }

    return ministries;
  }
}

export const FIND_MEMBER_OCCUPATION = new InjectionToken('FIND_MEMBER_OCCUPATION');

Container.provide([{
  provide: FIND_MEMBER_OCCUPATION,
  useClass: FindMemberOccupation
}]);
