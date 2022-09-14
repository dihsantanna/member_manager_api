import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';
import { FindByEmail } from './FindByEmail';

describe('Testando classe FindByEmail', () => {
  it('Deve ser possível criar uma nova instância', () => {
    const userRepository = new UserRepositoryInMemory();
    const findByEmail = new FindByEmail(userRepository);

    expect(findByEmail).toBeInstanceOf(FindByEmail);
  });

  it('Deve ser possível encontrar um usuário pelo email, e retorna um User', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    await createUser.execute(createUserProps);

    const findByEmail = new FindByEmail(userRepository);
    const user = await findByEmail.execute(createUserProps.email);

    expect(user).not.toBeNull();
    expect(user).toBeInstanceOf(User);
  });

  it('Deve retornar um erro caso o usuário não seja encontrado', async () => {
    const userRepository = new UserRepositoryInMemory();
    const findByEmail = new FindByEmail(userRepository);

    try {
      await findByEmail.execute(createUserProps.email);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não encontrado');
      expect((error as CustomError).statusCode).toBe(status.NOT_FOUND);
    }
  });
});
