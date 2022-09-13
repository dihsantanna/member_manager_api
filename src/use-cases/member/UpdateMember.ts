import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Member, State } from '../../entities';
import { CustomError } from '../../helpers';
import { IMemberRepository } from '../../repositories';

export interface UpdateData {
  fullName?: string
  birthDate?: string
  nationality?: string
  fatherName?: string
  motherName?: string
  civilStatus?: string
  rg?: string | null
  rgEmissionDate?: string | null
  rgDispatcher?: string | null
  cpf?: string | null
  email?: string | null
  phone?: string | null
  mobilePhone?: string | null
  street?: string
  number?: number | null
  complement?: string | null
  district?: string
  city?: string
  state?: State | null
  profession?: string | null
  congregated?: boolean
}

interface UpdateMemberRequest {
  id: number
  data: UpdateData
}

type UpdateMemberResponse = Member;

@Injectable()
export class UpdateMember {
  constructor (
    private memberRepository: IMemberRepository
  ) { }

  async execute ({ id, data }: UpdateMemberRequest): Promise<UpdateMemberResponse> {
    const member = await this.memberRepository.findById(id);

    if (!member) {
      throw new CustomError('Membro não existe.', status.BAD_REQUEST);
    }

    const updatedMember = await this.memberRepository.update(id, data);

    return updatedMember;
  }
}

export const UPDATE_MEMBER = new InjectionToken('UPDATE_MEMBER');

Container.provide([{
  provide: UPDATE_MEMBER,
  useClass: UpdateMember
}]);
