import { describe, expect, it } from 'vitest';

import { Member, Ministry, MinistryWithMembersQty } from '../../entities';
import { ministryProps } from '../../tests/utils';
import { MinistryRepositoryInMemory } from './MinistryRepositoryInMemory';

const { name } = ministryProps;

const updatedName = `${name} Unitários`;

describe('Testando MinistryRepositoryInMemory', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepositoryInMemory = new MinistryRepositoryInMemory();

    expect(ministryRepositoryInMemory).toBeInstanceOf(MinistryRepositoryInMemory);
  });

  describe('Metodo create', () => {
    it('Deve ser possível criar um ministério e retornar um Ministry.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const ministries = ministryRepositoryInMemory.ministries;

      expect(ministries).toHaveLength(0);

      const ministryInitialQty = ministries.length;
      const createMinistry = await ministryRepositoryInMemory.create(ministry);

      expect(ministries).toHaveLength(ministryInitialQty + 1);
      expect(createMinistry).toBeInstanceOf(Ministry);
    });
  });

  describe('Método findById', () => {
    it('Deve ser possível encontrar um ministério pelo "id" e retornar um Ministry.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const createMinistry = await ministryRepositoryInMemory.create(ministry);
      const ministryFound = await ministryRepositoryInMemory.findById(
        createMinistry.id as number
      );

      expect(ministryFound).toBe(createMinistry);
      expect(ministryFound).toBeInstanceOf(Ministry);
    });

    it('Deve retornar null se não encontrar um ministério pelo "id".', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministryFound = await ministryRepositoryInMemory.findById(1);

      expect(ministryFound).toBeNull();
    });
  });

  describe('Método findByName', () => {
    it('Deve ser possível encontrar um ministério pelo "name" e retornar um Ministry.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const createMinistry = await ministryRepositoryInMemory.create(ministry);
      const ministryFound = await ministryRepositoryInMemory.findByName(
        createMinistry.name
      );

      expect(ministryFound).toBe(createMinistry);
      expect(ministryFound).toBeInstanceOf(Ministry);
    });

    it('Deve retornar null se não encontrar um ministério pelo "name".', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministryFound = await ministryRepositoryInMemory.findByName(name);

      expect(ministryFound).toBeNull();
    });
  });

  describe('Método findMembersOfMinistry', () => {
    it('Deve ser possível encontrar os membros de um ministério e retorna um array de Member', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const createMinistry = await ministryRepositoryInMemory.create(ministry);

      const members = await ministryRepositoryInMemory.findMembersOfMinistry(
        createMinistry.id as number
      );

      expect(members).toBeInstanceOf(Array);
      expect((members as unknown as Member[])[0]).toBeInstanceOf(Member);
    });

    it('Deve retornar null caso o ministério não exista', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();

      const members = await ministryRepositoryInMemory.findMembersOfMinistry(1);

      expect(members).toBeNull();
    });

    it('Deve retornar um array vazio caso o ministério não tenha membros', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      await ministryRepositoryInMemory.create(ministry);

      const createMinistry = await ministryRepositoryInMemory.create(ministry);

      const members = await ministryRepositoryInMemory.findMembersOfMinistry(
        createMinistry.id as number
      );

      expect(members).toHaveLength(0);
    });
  });

  describe('Método findAll', () => {
    it('Deve ser possível encontrar todos os ministérios e retornar um array de MinistryWithMembersQty.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      await ministryRepositoryInMemory.create(ministry);
      const ministries = await ministryRepositoryInMemory.findAll();

      expect(ministries.length).toBe(ministryRepositoryInMemory.ministries.length);
      expect(ministries[0]).toBeInstanceOf(MinistryWithMembersQty);
    });

    it('Deve retornar um array vazio caso não exista nenhum ministério.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministries = await ministryRepositoryInMemory.findAll();

      expect(ministries).toHaveLength(0);
    });
  });

  describe('Método update', () => {
    it('Deve ser possível atualizar um ministério e retornar um Ministry.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const createMinistry = await ministryRepositoryInMemory.create(ministry);
      const ministryUpdated = await ministryRepositoryInMemory.update(
        createMinistry.id as number,
        { name: updatedName }
      );

      expect(ministryUpdated?.name).toBe(updatedName);
      expect(ministryUpdated).toBeInstanceOf(Ministry);
    });

    it('Deve retornar null caso o ministério não exista.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministryUpdated = await ministryRepositoryInMemory.update(1, {
        name: updatedName
      });

      expect(ministryUpdated).toBeNull();
    });
  });

  describe('Método delete', () => {
    it('Deve ser possível deletar um ministério e retornar um Ministry.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministry = new Ministry({ name });
      const ministryCreated = await ministryRepositoryInMemory.create(ministry);
      const ministryDeleted = await ministryRepositoryInMemory.delete(
        ministryCreated.id as number
      );

      expect(ministryRepositoryInMemory).not.toContainEqual(ministryDeleted);
      expect(ministryDeleted).toBeInstanceOf(Ministry);
    });

    it('Deve retornar null caso o ministério não exista.', async () => {
      const ministryRepositoryInMemory = new MinistryRepositoryInMemory();
      const ministryDeleted = await ministryRepositoryInMemory.delete(1);

      expect(ministryDeleted).toBeNull();
    });
  });
});
