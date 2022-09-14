import { Container, Injectable, InjectionToken } from '@decorators/di';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories';

type FindAllUsersResponse = User[];

@Injectable()
export class FindAllUsers {
  constructor (
    private userRepository: IUserRepository
  ) { }

  async execute (): Promise<FindAllUsersResponse> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export const FIND_ALL_USERS = new InjectionToken('FIND_ALL_USERS');

Container.provide([{
  provide: FIND_ALL_USERS,
  useClass: FindAllUsers
}]);
