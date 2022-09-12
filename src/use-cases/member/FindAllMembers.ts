import { Member } from '../../entities';
import { IMemberRepository } from '../../repositories';

type FindAllMembersResponse = Member[];

export class FindAllMembers {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (): Promise<FindAllMembersResponse> {
    const members = await this.memberRepository.findAll();

    return members;
  }
}
