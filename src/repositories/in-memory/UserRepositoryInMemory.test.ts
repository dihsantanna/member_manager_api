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

  describe('Método findById', () => {
    it('Deve ser possível encontrar um usuário pelo id, e NÃO deve possuir a chave "password"', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = new User(createUserProps);

      const createdUser = await userRepository.create(user);
      const userFound = await userRepository.findById(createdUser.id as number);

      expect(userFound).not.toBeNull();
      expect(userFound).toBeInstanceOf(User);
      expect(userFound).to.have.keys(
        ['id', 'fullName', 'email', 'roleName']
      );
      expect(userFound).not.toHaveProperty('password');
    });

    it('Deve retornar null caso não encontre um usuário pelo id', async () => {
      const userRepository = new UserRepositoryInMemory();
      const userFound = await userRepository.findById(1);

      expect(userFound).toBeNull();
    });
  });

  describe('Método FindAll', () => {
    it('Deve ser possível retornar uma lista de usuários, e NÃO deve possuir a chave "password"', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = new User(createUserProps);

      await userRepository.create(user);
      const users = await userRepository.findAll();

      expect(users).toHaveLength(1);
      expect(users[0]).toBeInstanceOf(User);
      expect(users[0]).to.have.keys(
        ['id', 'fullName', 'email', 'roleName']
      );
      expect(users[0]).not.toHaveProperty('password');
    });

    it('Deve retornar uma lista vazia caso não encontre nenhum usuário', async () => {
      const userRepository = new UserRepositoryInMemory();
      const users = await userRepository.findAll();

      expect(users).toHaveLength(0);
    });
  });

  describe('Método update', () => {
    const newEmail = 'john@doe.com';
    const newRoleName = 'PRESIDENT';

    it('Deve ser possível atualizar um usuário, e retornar um User', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = new User(createUserProps);

      const createdUser = await userRepository.create(user);
      const userUpdated = await userRepository.update(createdUser.id as number, {
        email: newEmail,
        roleName: newRoleName
      });

      expect(userUpdated).toBeInstanceOf(User);
      expect(userUpdated.email).toBe(newEmail);
      expect(userUpdated.roleName).toBe(newRoleName);
      expect(userRepository.users).toHaveLength(1);
      expect(userRepository.users[0].email).toBe(newEmail);
      expect(userRepository.users[0].roleName).toBe(newRoleName);
    });
  });
});
