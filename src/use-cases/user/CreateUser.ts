import { Container, Injectable, InjectionToken } from '@decorators/di';
import { StatusCodes as status } from 'http-status-codes';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { IUserRepository } from '../../repositories';

interface CreateUserRequest {
  email: string
  password: string
  roleName: string
}

type CreateUserResponse = User;

@Injectable()
export class CreateUser {
  constructor (private userRepository: IUserRepository) {}

  async execute (user: CreateUserRequest): Promise<CreateUserResponse> {
    const checkUserExists = await this.userRepository.findByEmail(user.email);

    if (checkUserExists) throw new CustomError('Email de usuário já cadastrado', status.BAD_REQUEST);

    const newUser = new User(user);

    return this.userRepository.create(newUser);
  }
}

export const CREATE_USER = new InjectionToken('CREATE_USER');

Container.provide([{
  provide: CREATE_USER,
  useClass: CreateUser
}]);
