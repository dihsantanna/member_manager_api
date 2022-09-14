import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Ministry } from '../../entities';

import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

interface UpdateMemberInMinistryRequest {
  id: number
  data: number[]
}

type UpdateMemberInMinistryResponse = Ministry[];

@Injectable()
export class UpdateMemberInMinistry {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (
    { id, data }: UpdateMemberInMinistryRequest
  ): Promise<UpdateMemberInMinistryResponse> {
    const ministries = await this.memberRepository.updateMemberInMinistry(id, data);

    if (!ministries) {
      throw new CustomError('Membro não existe.', status.BAD_REQUEST);
    }

    return ministries;
  }
}

export const UPDATE_MEMBER_IN_MINISTRY = new InjectionToken('UPDATE_MEMBER_IN_MINISTRY');

Container.provide([{
  provide: UPDATE_MEMBER_IN_MINISTRY,
  useClass: UpdateMemberInMinistry
}]);
