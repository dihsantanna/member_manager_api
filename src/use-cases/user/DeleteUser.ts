import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

type DeleteUserRequest = number;

@Injectable()
export class DeleteUser {
  constructor (private userRepository: IUserRepository) {}

  async execute (id: DeleteUserRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findById(id);

    if (!checkUserExists) throw new CustomError('Usuário não existe', status.BAD_REQUEST);

    await this.userRepository.delete(id);
  }
}

export const DELETE_USER = new InjectionToken('DELETE_USER');

Container.provide([{
  provide: DELETE_USER,
  useClass: DeleteUser
}]);
