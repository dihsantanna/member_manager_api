import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { IMinistryRepository } from '../../repositories';

type FindMembersOfMinistryRequest = number;

type FindMembersOfMinistryResponse = Member[];

@Injectable()
export class FindMembersOfMinistry {
  constructor (
    private ministryRepository: IMinistryRepository
  ) { }

  async execute (ministryId: FindMembersOfMinistryRequest): Promise<FindMembersOfMinistryResponse> {
    const ministry = await this.ministryRepository.findMembersOfMinistry(ministryId);

    if (!ministry) {
      throw new CustomError('Ministério não existe', status.BAD_REQUEST);
    }

    return ministry;
  }
}

export const FIND_MEMBERS_OF_MINISTRY = new InjectionToken('FIND_MEMBERS_OF_MINISTRY');

Container.provide([{
  provide: FIND_MEMBERS_OF_MINISTRY,
  useClass: FindMembersOfMinistry
}]);
