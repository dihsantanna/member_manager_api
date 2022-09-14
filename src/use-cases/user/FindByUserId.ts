import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

type FindByUserIdRequest = number;

type FindByUserIdResponse = User;

@Injectable()
export class FindByUserId {
  constructor (private userRepository: IUserRepository) {}

  async execute (id: FindByUserIdRequest): Promise<FindByUserIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new CustomError('Usuário não encontrado', status.NOT_FOUND);

    return user;
  }
}

export const FIND_BY_USER_ID = new InjectionToken('FIND_BY_USER_ID');

Container.provide([{
  provide: FIND_BY_USER_ID,
  useClass: FindByUserId
}]);
