import { Container, Injectable, InjectionToken } from '@decorators/di';

import { Member } from '../../entities';
import { IMemberRepository } from '../../repositories';

type FindAllMembersResponse = Member[];

@Injectable()
export class FindAllMembers {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (): Promise<FindAllMembersResponse> {
    const members = await this.memberRepository.findAll();

    return members;
  }
}

export const FIND_ALL_MEMBERS = new InjectionToken('FIND_ALL_MEMBERS');

Container.provide([{
  provide: FIND_ALL_MEMBERS,
  useClass: FindAllMembers
}]);
