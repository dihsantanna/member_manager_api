import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { IMinistryRepository } from '../../repositories';

interface CreateMinistryRequest {
  name: string
}

type CreateMinistryResponse = Ministry;

@Injectable()
export class CreateMinistry {
  constructor (
    private ministryRepository: IMinistryRepository
  ) { }

  async execute ({ name }: CreateMinistryRequest): Promise<CreateMinistryResponse> {
    const ministry = new Ministry({ name });

    if (await this.ministryRepository.findByName(name)) {
      throw new CustomError('Ministério já existe', status.BAD_REQUEST);
    }
    const createdMinistry = await this.ministryRepository.create(ministry);
    return createdMinistry;
  }
}

export const CREATE_MINISTRY = new InjectionToken('CREATE_MINISTRY');

Container.provide([{
  provide: CREATE_MINISTRY,
  useClass: CreateMinistry
}]);
