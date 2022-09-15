import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';

import { UpdateUserPassword } from './UpdateUserPassword';

const newPassword = 'outro_password';

describe('Testando classe UpdateUserPassword', () => {
  it('Deve ser possível criar uma instância.', () => {
    const userRepository = new UserRepositoryInMemory();
    const updateUser = new UpdateUserPassword(userRepository);

    expect(updateUser).toBeInstanceOf(UpdateUserPassword);
  });

  it('Deve ser possível atualizar um usuário, metodo não deve ter retorno.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute(createUserProps);

    const updateUser = new UpdateUserPassword(userRepository);

    const updatedUser = await updateUser.execute({
      id: user.id as number,
      password: newPassword
    });

    expect(updatedUser).not.toThrow(CustomError);
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0].password).toBe(newPassword);
  });

  it('Deve retornar um erro se o usuário não existir.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const updateUser = new UpdateUserPassword(userRepository);

    try {
      await updateUser.execute({
        id: 1,
        password: newPassword
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
