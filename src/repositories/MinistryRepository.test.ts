import { Ministry as MinistryPrisma } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { Member, Ministry } from '../entities';
import { createMockModel, MockModel, Model } from '../model';
import { ministriesMock, ministryMembersMock } from '../tests/utils';
import { MinistryRepository } from './MinistryRepository';

let mockModel: MockModel;
let model: Model;

beforeEach(() => {
  mockModel = createMockModel();
  model = mockModel as Model;
});

describe('Testando MinistryRepository', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministryRepository = new MinistryRepository(model);

    expect(ministryRepository).toBeInstanceOf(MinistryRepository);
  });

  describe('Metodo create', () => {
    it('Deve ser possível criar um ministério e retornar um Ministry.', async () => {
      const name = ministriesMock[0].name;

      mockModel.ministry.create.mockResolvedValueOnce(
        { ...ministriesMock[0] } as unknown as MinistryPrisma
      );

      const ministryRepository = new MinistryRepository(model);
      const ministry = new Ministry({ name });

      const createMinistry = await ministryRepository.create(ministry);

      expect(createMinistry).toBeInstanceOf(Ministry);
      expect(createMinistry).toEqual(ministriesMock[0]);
    });
  });

  describe('Método findById', () => {
    it('Deve ser possível encontrar um ministério pelo "id" e retornar um Ministry.', async () => {
      const id = ministriesMock[0].id;

      mockModel.ministry.findUnique.mockResolvedValueOnce(
        { ...ministriesMock[0] } as unknown as MinistryPrisma
      );

      const ministryRepository = new MinistryRepository(model);
      const ministryFound = await ministryRepository.findById(id as number);

      expect(ministryFound).toBeInstanceOf(Ministry);
      expect(ministryFound).toEqual(ministriesMock[0]);
    });

    it('Deve retornar null se não encontrar um ministério pelo "id".', async () => {
      const id = ministriesMock[0].id;

      mockModel.ministry.findUnique.mockResolvedValueOnce(null);

      const ministryRepository = new MinistryRepository(model);
      const ministryFound = await ministryRepository.findById(id as number);

      expect(ministryFound).toBeNull();
    });
  });

  describe('Método findByName', () => {
    it('Deve ser possível encontrar um ministério pelo "name" e retornar um Ministry.', async () => {
      const name = ministriesMock[0].name;

      mockModel.ministry.findUnique.mockResolvedValueOnce(
        { ...ministriesMock[0] } as unknown as MinistryPrisma
      );

      const ministryRepository = new MinistryRepository(model);
      const ministryFound = await ministryRepository.findByName(name);

      expect(ministryFound).toBeInstanceOf(Ministry);
      expect(ministryFound).toEqual(ministriesMock[0]);
    });

    it('Deve retornar null se não encontrar um ministério pelo "name".', async () => {
      const name = ministriesMock[0].name;

      mockModel.ministry.findUnique.mockResolvedValueOnce(null);

      const ministryRepository = new MinistryRepository(model);
      const ministryFound = await ministryRepository.findByName(name);

      expect(ministryFound).toBeNull();
    });
  });

  describe('Método findMembersOfMinistry', () => {
    it('Deve ser possível encontrar os membros de um ministério pelo "id" e retornar um array de Member.', async () => {
      const id = ministriesMock[0].id;

      const findMembersOfMinistryResult = [
        new Member({ ...ministryMembersMock.members[0].member }),
        new Member({ ...ministryMembersMock.members[1].member })
      ];

      mockModel.ministry.findUnique.mockResolvedValueOnce(
        { ...ministryMembersMock } as unknown as MinistryPrisma
      );

      const ministryRepository = new MinistryRepository(model);
      const members = await ministryRepository.findMembersOfMinistry(id as number);

      expect(members).toBeInstanceOf(Array);
      expect(members).toEqual(findMembersOfMinistryResult);
      expect((members as Member[])[0]).toBeInstanceOf(Member);
    });

    it('Deve retornar null se não encontrar um ministério pelo "id".', async () => {
      const id = ministriesMock[0].id;

      mockModel.ministry.findUnique.mockResolvedValueOnce(null);

      const ministryRepository = new MinistryRepository(model);
      const members = await ministryRepository.findMembersOfMinistry(id as number);

      expect(members).toBeNull();
    });
  });
});
