import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';
import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { IOccupationRepository } from '../../repositories';

interface DeleteOccupationRequest {
  id: number
}

type DeleteOccupationResponse = Occupation;

@Injectable()
export class DeleteOccupation {
  constructor (
    private occupationRepository: IOccupationRepository
  ) {}

  async execute ({ id }: DeleteOccupationRequest): Promise<DeleteOccupationResponse> {
    const occupationDeleted = await this.occupationRepository.delete(id);

    if (!occupationDeleted) throw new CustomError('Cargo não existe.', status.BAD_REQUEST);

    return occupationDeleted;
  }
}

export const DELETE_OCCUPATION = new InjectionToken('DELETE_OCCUPATION');

Container.provide([{
  provide: DELETE_OCCUPATION,
  useClass: DeleteOccupation
}]);
