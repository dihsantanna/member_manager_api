import { Container, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Ministry, MinistryProps } from '../../entities';
import { CustomError } from '../../helpers';
import { IMinistryRepository } from '../../repositories';

interface UpdateMinistryRequest {
  id: number
  data: MinistryProps
}

export class UpdateMinistry {
  constructor (
    private ministryRepository: IMinistryRepository
  ) { }

  async execute ({ id, data: { name } }: UpdateMinistryRequest): Promise<Ministry> {
    const ministry = await this.ministryRepository.update(id, { name });
    if (!ministry) throw new CustomError('Ministério não existe.', status.BAD_REQUEST);
    return ministry;
  }
}

export const UPDATE_MINISTRY = new InjectionToken('UPDATE_MINISTRY');

Container.provide([{
  provide: UPDATE_MINISTRY,
  useClass: UpdateMinistry
}]);
