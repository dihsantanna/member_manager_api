import { describe, expect, it } from 'vitest';

import { Member, Occupation } from '../../entities';
import { occupationProps } from '../../tests/utils';
import { OccupationRepositoryInMemory } from './OccupationRepositoryInMemory';

const { name } = occupationProps;

describe('Testando OccupationRepositoryInMemory', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupationRepositoryInMemory = new OccupationRepositoryInMemory();

    expect(occupationRepositoryInMemory).toBeInstanceOf(OccupationRepositoryInMemory);
  });

  describe('Metodo create', () => {
    it('Deve ser possível criar um cargo e retornar um Occupation.', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      const occupations = occupationRepositoryInMemory.occupations;

      expect(occupations).toHaveLength(0);

      const occupationInitialQty = occupations.length;
      const createOccupation = await occupationRepositoryInMemory.create(occupation);

      expect(occupations).toHaveLength(occupationInitialQty + 1);
      expect(createOccupation).toBeInstanceOf(Occupation);
    });
  });

  describe('Método findById', () => {
    it('Deve ser possível encontrar um cargo pelo "id" e retornar um Occupation.', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      const createOccupation = await occupationRepositoryInMemory.create(occupation);
      const occupationFound = await occupationRepositoryInMemory.findById(
        createOccupation.id as number
      );

      expect(occupationFound).toBe(createOccupation);
      expect(occupationFound).toBeInstanceOf(Occupation);
    });

    it('Deve retornar null se não encontrar um cargo pelo "id".', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupationFound = await occupationRepositoryInMemory.findById(1);

      expect(occupationFound).toBeNull();
    });
  });

  describe('Método findByName', () => {
    it('Deve ser possível encontrar um cargo pelo "name" e retornar um Occupation.', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      const createOccupation = await occupationRepositoryInMemory.create(occupation);
      const occupationFound = await occupationRepositoryInMemory.findByName(
        createOccupation.name
      );

      expect(occupationFound).toBe(createOccupation);
      expect(occupationFound).toBeInstanceOf(Occupation);
    });

    it('Deve retornar null se não encontrar um cargo pelo "name".', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupationFound = await occupationRepositoryInMemory.findByName('name');

      expect(occupationFound).toBeNull();
    });
  });

  describe('Método findMembersOfOccupation', () => {
    it('Deve ser possível encontrar os membros de um cargo e retorna um array de Member', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      const createOccupation = await occupationRepositoryInMemory.create(occupation);

      const members = await occupationRepositoryInMemory.findMembersOfOccupation(
        createOccupation.id as number
      );

      expect(members).toBeInstanceOf(Array);
      expect((members as unknown as Member[])[0]).toBeInstanceOf(Member);
    });

    it('Deve retornar null caso o cargo não exista', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();

      const members = await occupationRepositoryInMemory.findMembersOfOccupation(1);

      expect(members).toBeNull();
    });

    it('Deve retornar um array vazio caso o cargo não tenha membros', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      await occupationRepositoryInMemory.create(occupation);

      const createOccupation = await occupationRepositoryInMemory.create(occupation);

      const members = await occupationRepositoryInMemory.findMembersOfOccupation(
        createOccupation.id as number
      );

      expect(members).toHaveLength(0);
    });
  });

  describe('método findAll', () => {
    it('Deve ser possível encontrar todos os cargos e retornar um array de Occupation.', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupation = new Occupation({ name });
      await occupationRepositoryInMemory.create(occupation);
      const occupations = await occupationRepositoryInMemory.findAll();

      expect(occupations.length).toBe(occupationRepositoryInMemory.occupations.length);
      expect(occupations[0]).toBeInstanceOf(Occupation);
    });

    it('Deve retornar um array vazio se não encontrar nenhum cargo.', async () => {
      const occupationRepositoryInMemory = new OccupationRepositoryInMemory();
      const occupations = await occupationRepositoryInMemory.findAll();

      expect(occupations).toHaveLength(0);
    });
  });
});
