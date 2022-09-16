import { Container, Injectable, InjectionToken } from '@decorators/di';
import { MinistryWithMembersQty } from '../../entities';
import { IMinistryRepository } from '../../repositories';

type FindAllMinistriesResponse = MinistryWithMembersQty[];

@Injectable()
export class FindAllMinistries {
  constructor (
    private ministryRepository: IMinistryRepository
  ) { }

  async execute (): Promise<FindAllMinistriesResponse> {
    return await this.ministryRepository.findAll();
  }
}

export const FIND_ALL_MINISTRIES = new InjectionToken('FIND_ALL_MINISTRIES');

Container.provide([{
  provide: FIND_ALL_MINISTRIES,
  useClass: FindAllMinistries
}]);
