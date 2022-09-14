import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';

import { UpdateUserEmail } from './UpdateUserEmail';

const newEmail = 'john@doe.com';

describe('Testando classe UpdateUserEmail', () => {
  it('Deve ser possível criar uma instância.', () => {
    const userRepository = new UserRepositoryInMemory();
    const updateUser = new UpdateUserEmail(userRepository);

    expect(updateUser).toBeInstanceOf(UpdateUserEmail);
  });

  it('Deve ser possível atualizar um usuário, e retorna um User.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute(createUserProps);

    const updateUser = new UpdateUserEmail(userRepository);

    const updatedUser = await updateUser.execute({
      id: user.id as number,
      email: newEmail
    });

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.email).toBe(newEmail);
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0].email).toBe(newEmail);
  });

  it('Deve retornar um erro se o usuário não existir.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const updateUser = new UpdateUserEmail(userRepository);

    try {
      await updateUser.execute({
        id: 1,
        email: newEmail
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
