import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Member, MemberProps } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

interface CreateMemberRequest extends MemberProps {}

type CreateMemberResponse = Member;

@Injectable()
export class CreateMember {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute (data: CreateMemberRequest): Promise<CreateMemberResponse> {
    const member = new Member(data);

    if (member.email) {
      const memberWithEmail = await this.memberRepository.findByEmail(member.email);
      if (memberWithEmail) {
        throw new CustomError('Membro possui e-mail já cadastrado.', status.BAD_REQUEST);
      }
    }

    const memberCreated = await this.memberRepository.create(member);

    return memberCreated;
  }
}

export const CREATE_MEMBER = new InjectionToken('CREATE_MEMBER');

Container.provide([{
  provide: CREATE_MEMBER,
  useClass: CreateMember
}]);
