import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

interface UpdateUserRoleRequest {
  id: number
  roleName: string
}

type UpdateUserRoleResponse = User;

@Injectable()
export class UpdateUserRole {
  constructor (
    private userRepository: IUserRepository
  ) { }

  async execute ({ id, roleName }: UpdateUserRoleRequest): Promise<UpdateUserRoleResponse> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new CustomError('Usuário não existe', status.BAD_REQUEST);

    const updatedUser = await this.userRepository.update(id, { roleName });

    return updatedUser;
  }
}

export const UPDATE_USER_ROLE = new InjectionToken('UPDATE_USER_ROLE');

Container.provide([{
  provide: UPDATE_USER_ROLE,
  useClass: UpdateUserRole
}]);
