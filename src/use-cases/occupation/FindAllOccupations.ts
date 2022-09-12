import { Container, Injectable, InjectionToken } from '@decorators/di';
import { Occupation } from '../../entities';
import { IOccupationRepository } from '../../repositories';

type FindAllOccupationsResponse = Occupation[];

@Injectable()
export class FindAllOccupations {
  constructor (
    private occupationRepository: IOccupationRepository
  ) { }

  async execute (): Promise<FindAllOccupationsResponse> {
    return await this.occupationRepository.findAll();
  }
}

export const FIND_ALL_OCCUPATION = new InjectionToken('FIND_ALL_OCCUPATION');

Container.provide([{
  provide: FIND_ALL_OCCUPATION,
  useClass: FindAllOccupations
}]);
