import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';

import { UpdateUserRole } from './UpdateUserRole';

const newRole = 'PRESIDENT';

describe('Testando classe UpdateUserRole', () => {
  it('Deve ser possível criar uma instância.', () => {
    const userRepository = new UserRepositoryInMemory();
    const updateUser = new UpdateUserRole(userRepository);

    expect(updateUser).toBeInstanceOf(UpdateUserRole);
  });

  it('Deve ser possível atualizar um usuário, e retorna um User.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute(createUserProps);

    const updateUser = new UpdateUserRole(userRepository);

    const updatedUser = await updateUser.execute({
      id: user.id as number,
      roleName: newRole
    });

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.roleName).toBe(newRole);
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0].roleName).toBe(newRole);
  });

  it('Deve retornar um erro se o usuário não existir.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const updateUser = new UpdateUserRole(userRepository);

    try {
      await updateUser.execute({
        id: 1,
        roleName: newRole
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
