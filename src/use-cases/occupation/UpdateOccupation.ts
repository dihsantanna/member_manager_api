import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Occupation, OccupationProps } from '../../entities';
import { CustomError } from '../../helpers';
import { IOccupationRepository } from '../../repositories';

interface UpdateOccupationRequest {
  id: number
  data: OccupationProps
}

@Injectable()
export class UpdateOccupation {
  constructor (
    private occupationRepository: IOccupationRepository
  ) { }

  async execute ({ id, data: { name } }: UpdateOccupationRequest): Promise<Occupation> {
    const occupation = await this.occupationRepository.update(id, { name });
    if (!occupation) throw new CustomError('Cargo não existe.', status.BAD_REQUEST);
    return occupation;
  }
}

export const UPDATE_OCCUPATION = new InjectionToken('UPDATE_OCCUPATION');

Container.provide([{
  provide: UPDATE_OCCUPATION,
  useClass: UpdateOccupation
}]);
