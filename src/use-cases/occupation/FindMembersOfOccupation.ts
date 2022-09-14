import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Member } from '../../entities';
import { CustomError } from '../../helpers';
import { IOccupationRepository } from '../../repositories';

type FindMembersOfOccupationRequest = number;

type FindMembersOfOccupationResponse = Member[];

@Injectable()
export class FindMembersOfOccupation {
  constructor (
    private occupationRepository: IOccupationRepository
  ) { }

  async execute (occupationId: FindMembersOfOccupationRequest): Promise<FindMembersOfOccupationResponse> {
    const occupation = await this.occupationRepository.findMembersOfOccupation(occupationId);

    if (!occupation) {
      throw new CustomError('Cargo não existe', status.BAD_REQUEST);
    }

    return occupation;
  }
}

export const FIND_MEMBERS_OF_OCCUPATION = new InjectionToken('FIND_MEMBERS_OF_OCCUPATION');

Container.provide([{
  provide: FIND_MEMBERS_OF_OCCUPATION,
  useClass: FindMembersOfOccupation
}]);
