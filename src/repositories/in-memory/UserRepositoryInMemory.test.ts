import { describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { createUserProps } from '../../tests/utils';
import { UserRepositoryInMemory } from './UserRepositoryInMemory';

describe('Testando classe UserRepositoryInMemory', () => {
  it('Deve ser possível criar uma nova instância', () => {
    const userRepository = new UserRepositoryInMemory();

    expect(userRepository).toBeInstanceOf(UserRepositoryInMemory);
  });

  describe('Método create', () => {
    it('Deve ser possível criar um novo usuário, e retorna um User', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = new User(createUserProps);
      const users = userRepository.users;

      expect(users).toHaveLength(0);

      const userInitialLen = users.length;
      const userCreated = await userRepository.create(user);

      expect(users).toHaveLength(userInitialLen + 1);
      expect(userCreated).toBeInstanceOf(User);
    });
  });

  describe('Método findByEmail', () => {
    it('Deve ser possível encontrar um usuário pelo email, e deve possuir a chave "password"', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = new User(createUserProps);

      await userRepository.create(user);
      const userFound = await userRepository.findByEmail(createUserProps.email);

      expect(userFound).not.toBeNull();
      expect(userFound).toBeInstanceOf(User);
      expect(userFound).to.have.keys(
        ['id', 'fullName', 'email', 'password', 'roleName']
      );
    });

    it('Deve retornar null caso não encontre um usuário pelo email', async () => {
      const userRepository = new UserRepositoryInMemory();
      const userFound = await userRepository.findByEmail(createUserProps.email);

      expect(userFound).toBeNull();
    });
  });
});
