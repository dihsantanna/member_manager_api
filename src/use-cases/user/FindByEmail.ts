import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

type FindByEmailRequest = string;

type FindByEmailResponse = User;

@Injectable()
export class FindByEmail {
  constructor (private userRepository: IUserRepository) {}

  async execute (email: FindByEmailRequest): Promise<FindByEmailResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new CustomError('Usuário não encontrado', status.NOT_FOUND);

    return user;
  }
}

export const FIND_BY_EMAIL = new InjectionToken('FindByEmail');

Container.provide([{
  provide: FIND_BY_EMAIL,
  useClass: FindByEmail
}]);
