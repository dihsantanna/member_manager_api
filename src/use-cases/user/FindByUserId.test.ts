import { StatusCodes as status } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

import { User } from '../../entities/User';
import { CustomError } from '../../helpers';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';
import { CreateUser } from './CreateUser';
import { FindByUserId } from './FindByUserId';

describe('Testando classe FindByUserId', () => {
  it('Deve ser possível criar uma nova instância', () => {
    const userRepository = new UserRepositoryInMemory();
    const findByUserId = new FindByUserId(userRepository);

    expect(findByUserId).toBeInstanceOf(FindByUserId);
  });

  it('Deve ser possível encontrar um usuário pelo email, e retorna um User', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    const userCreated = await createUser.execute(createUserProps);

    const findByUserId = new FindByUserId(userRepository);
    const user = await findByUserId.execute(userCreated.id as number);

    expect(user).not.toBeNull();
    expect(user).toBeInstanceOf(User);
  });

  it('Deve retornar um erro caso o usuário não seja encontrado', async () => {
    const userRepository = new UserRepositoryInMemory();
    const findByUserId = new FindByUserId(userRepository);

    try {
      await findByUserId.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe('Usuário não encontrado');
      expect((error as CustomError).statusCode).toBe(status.NOT_FOUND);
    }
  });
});
