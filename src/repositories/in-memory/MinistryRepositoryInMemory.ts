import { IMinistryRepository } from '..';
import { Member, Ministry, MinistryProps, MinistryWithMembersQty } from '../../entities';
import { memberProps } from '../../tests/utils';

export class MinistryRepositoryInMemory implements IMinistryRepository {
  members: Member[] = [
    new Member(memberProps)
  ];

  ministries: Ministry[] = [];
  nextId = 1;

  async create ({ name }: Ministry): Promise<Ministry> {
    const ministry = new Ministry({
      id: this.nextId,
      name
    });

    this.nextId += 1;

    this.ministries.push(ministry);
    return ministry;
  }

  async findAll (): Promise<MinistryWithMembersQty[]> {
    return this.ministries.map(({ id, name }) => (
      new MinistryWithMembersQty({ id, name }, 0)
    ));
  }

  async findById (id: number): Promise<Ministry | null> {
    const ministry = this.ministries.find(ministry => ministry.id === id);
    return ministry || null;
  }

  async findByName (name: string): Promise<Ministry | null> {
    const ministry = this.ministries.find(ministry => ministry.name === name);
    return ministry || null;
  }

  async findMembersOfMinistry (ministryId: number): Promise<Member[] | null> {
    const ministry = await this.findById(ministryId);

    if (!ministry) return null;

    const members = this.members.filter(member => (
      member.ministries as unknown as Ministry[])[0].id === ministryId);

    return members;
  }

  async update (id: number, { name }: MinistryProps): Promise<Ministry | null> {
    const ministry = await this.findById(id);
    if (!ministry) return null;

    const ministryUpdated = new Ministry({ id, name });

    this.ministries = this.ministries.map(ministry => (
      ministry.id === id ? ministryUpdated : ministry
    ));
    return ministryUpdated;
  }

  async delete (id: number): Promise<Ministry | null> {
    const ministry = await this.findById(id);
    if (!ministry) return null;

    this.ministries = this.ministries.filter(ministry => ministry.id !== id);
    return ministry;
  }
}
