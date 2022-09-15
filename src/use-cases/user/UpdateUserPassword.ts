import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

interface UpdateUserPasswordRequest {
  id: number
  password: string
}

@Injectable()
export class UpdateUserPassword {
  constructor (
    private userRepository: IUserRepository
  ) { }

  async execute ({ id, password }: UpdateUserPasswordRequest): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new CustomError('Usuário não existe', status.BAD_REQUEST);

    await this.userRepository.updatePassword(id, password);
  }
}

export const UPDATE_USER_PASSWORD = new InjectionToken('UPDATE_USER_PASSWORD');

Container.provide([{
  provide: UPDATE_USER_PASSWORD,
  useClass: UpdateUserPassword
}]);
