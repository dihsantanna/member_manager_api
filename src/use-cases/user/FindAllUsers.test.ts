import { describe, expect, it } from 'vitest';

import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory';
import { createUserProps } from '../../tests/utils';

import { CreateUser } from './CreateUser';
import { FindAllUsers } from './FindAllUsers';

describe('Testando classe FindAllUsers', () => {
  it('Deve ser possível criar uma nova instância', () => {
    const userRepository = new UserRepositoryInMemory();
    const findAllUsers = new FindAllUsers(userRepository);

    expect(findAllUsers).toBeInstanceOf(FindAllUsers);
  });

  it('Deve ser possível encontrar todos os usuários, e retorna um array de User', async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUser = new CreateUser(userRepository);

    await createUser.execute(createUserProps);

    const findAllUsers = new FindAllUsers(userRepository);
    const users = await findAllUsers.execute();

    expect(users).not.toBeNull();
    expect(users).toBeInstanceOf(Array);
    expect(users[0]).toBeInstanceOf(User);
  });

  it('Dever retornar um array vazio caso não exista nenhum usuário', async () => {
    const userRepository = new UserRepositoryInMemory();
    const findAllUsers = new FindAllUsers(userRepository);

    const users = await findAllUsers.execute();

    expect(users).not.toBeNull();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(0);
  });
});
