import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

interface UpdateUserEmailRequest {
  id: number
  email: string
}

type UpdateUserEmailResponse = User;

@Injectable()
export class UpdateUserEmail {
  constructor (
    private userRepository: IUserRepository
  ) { }

  async execute ({ id, email }: UpdateUserEmailRequest): Promise<UpdateUserEmailResponse> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new CustomError('Usuário não existe', status.BAD_REQUEST);

    const updatedUser = await this.userRepository.update(id, { email });

    return updatedUser;
  }
}

export const UPDATE_USER_EMAIL = new InjectionToken('UPDATE_USER_EMAIL');

Container.provide([{
  provide: UPDATE_USER_EMAIL,
  useClass: UpdateUserEmail
}]);
