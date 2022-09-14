import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Occupation } from '../../entities';

import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

interface UpdateMemberInOccupationRequest {
  id: number
  data: number[]
}

type UpdateMemberInOccupationResponse = Occupation[];

@Injectable()
export class UpdateMemberInOccupation {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (
    { id, data }: UpdateMemberInOccupationRequest
  ): Promise<UpdateMemberInOccupationResponse> {
    const occupations = await this.memberRepository.updateMemberInOccupation(id, data);

    if (!occupations) {
      throw new CustomError('Membro não existe.', status.BAD_REQUEST);
    }

    return occupations;
  }
}

export const UPDATE_MEMBER_IN_MINISTRY = new InjectionToken('UPDATE_MEMBER_IN_MINISTRY');

Container.provide([{
  provide: UPDATE_MEMBER_IN_MINISTRY,
  useClass: UpdateMemberInOccupation
}]);
