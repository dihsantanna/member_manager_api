import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Member } from '../../entities';
import { CustomError } from '../../helpers';

import { IMemberRepository } from '../../repositories';

type DeleteMemberRequest = number;

type DeleteMemberResponse = Member;

@Injectable()
export class DeleteMember {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (id: DeleteMemberRequest): Promise<DeleteMemberResponse> {
    const member = await this.memberRepository.findById(id);

    if (!member) {
      throw new CustomError('Membro não existe.', status.BAD_REQUEST);
    }

    return this.memberRepository.delete(id); ;
  }
}

export const DELETE_MEMBER = new InjectionToken('DELETE_MEMBER');

Container.provide([{
  provide: DELETE_MEMBER,
  useClass: DeleteMember
}]);
