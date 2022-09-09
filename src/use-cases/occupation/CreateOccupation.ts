import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { Occupation } from '../../entities';
import { CustomError } from '../../helpers';
import { IOccupationRepository } from '../../repositories';

interface CreateOccupationRequest {
  name: string
}

type CreateOccupationResponse = Occupation;

@Injectable()
export class CreateOccupation {
  constructor (
    private occupationRepository: IOccupationRepository
  ) { }

  async execute ({ name }: CreateOccupationRequest): Promise<CreateOccupationResponse> {
    const occupation = new Occupation({ name });

    if (await this.occupationRepository.findByName(name)) {
      throw new CustomError('Cargo já existe', status.BAD_REQUEST);
    }
    const createdOccupation = await this.occupationRepository.create(occupation);
    return createdOccupation;
  }
}

export const CREATE_OCCUPATION = new InjectionToken('CREATE_OCCUPATION');

Container.provide([{
  provide: CREATE_OCCUPATION,
  useClass: CreateOccupation
}]);
