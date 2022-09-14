import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';

import { CreateUser } from './CreateUser';

describe('Testando classe CreateUser', () => {
  it('Deve ser possível criar uma nova instância', () => {
    const userRepository = new UserRepositoryInMemory();
    const createUser = new CreateUser(userRepository);

    expect(createUser).toBeInstanceOf(CreateUser);
  });

  it('Deve ser possível criar um novo usuário, e retorna um User', async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute(createUserProps);

    expect(user).not.toBeNull();
    expect(user).toBeInstanceOf(User);
  });

  it('Deve retornar um erro caso o email já esteja cadastrado', async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUser = new CreateUser(userRepository);
    await createUser.execute(createUserProps);

    try {
      await createUser.execute(createUserProps);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Email de usuário já cadastrado');
      expect((error as CustomError).statusCode).toBe(status.BAD_REQUEST);
    }
  });
});
