import { Container, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Ministry } from '../../entities';
import { CustomError } from '../../helpers';
import { IMinistryRepository } from '../../repositories';

interface DeleteMinistryRequest {
  id: number
}

type DeleteMinistryResponse = Ministry;

export class DeleteMinistry {
  constructor (
    private ministryRepository: IMinistryRepository
  ) {}

  async execute ({ id }: DeleteMinistryRequest): Promise<DeleteMinistryResponse> {
    const ministryDeleted = await this.ministryRepository.delete(id);

    if (!ministryDeleted) throw new CustomError('Ministério não existe.', status.BAD_REQUEST);

    return ministryDeleted;
  }
}

export const DELETE_MINISTRY = new InjectionToken('DELETE_MINISTRY');

Container.provide([{
  provide: DELETE_MINISTRY,
  useClass: DeleteMinistry
}]);
