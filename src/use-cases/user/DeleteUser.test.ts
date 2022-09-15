import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';

import { DeleteUser } from './DeleteUser';

describe('Testando classe DeleteUser', () => {
  it('Deve ser possível criar uma instância.', () => {
    const userRepository = new UserRepositoryInMemory();
    const deleteUser = new DeleteUser(userRepository);

    expect(deleteUser).toBeInstanceOf(DeleteUser);
  });

  it('Deve ser possível deletar um usuário, metodo não deve ter retorno.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute(createUserProps);

    expect(userRepository.users).toHaveLength(1);

    const deleteUser = new DeleteUser(userRepository);

    const deletedUser = await deleteUser.execute(user.id as number);

    expect(deletedUser).not.toThrow(CustomError);
    expect(userRepository.users).toHaveLength(0);
  });

  it('Deve retornar um erro se o usuário não existir.', async () => {
    const userRepository = new UserRepositoryInMemory();

    const deleteUser = new DeleteUser(userRepository);

    try {
      await deleteUser.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não existe');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
