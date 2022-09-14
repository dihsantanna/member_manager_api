import { IOccupationRepository } from '..';
import { Member, Occupation, OccupationProps } from '../../entities';
import { memberProps } from '../../tests/utils';

export class OccupationRepositoryInMemory implements IOccupationRepository {
  members: Member[] = [
    new Member(memberProps)
  ];

  occupations: Occupation[] = [];
  nextId = 1;

  async create ({ name }: Occupation): Promise<Occupation> {
    const occupation = new Occupation({
      id: this.nextId,
      name
    });

    this.nextId += 1;

    this.occupations.push(occupation);
    return occupation;
  }

  async findAll (): Promise<Occupation[]> {
    return this.occupations.map(({ id, name }) => (
      new Occupation({ id, name })
    ));
  }

  async findById (id: number): Promise<Occupation | null> {
    const occupation = this.occupations.find(occupation => occupation.id === id);
    return occupation || null;
  }

  async findByName (name: string): Promise<Occupation | null> {
    const occupation = this.occupations.find(occupation => occupation.name === name);
    return occupation || null;
  }

  async findMembersOfOccupation (occupationId: number): Promise<Member[] | null> {
    const occupation = await this.findById(occupationId);

    if (!occupation) return null;

    const members = this.members.filter(member => (
      member.ministries as unknown as Occupation[])[0].id === occupationId);

    return members;
  }

  async update (id: number, { name }: OccupationProps): Promise<Occupation | null> {
    const occupation = await this.findById(id);
    if (!occupation) return null;

    const occupationUpdated = new Occupation({ id, name });

    this.occupations = this.occupations.map(occupation => (
      occupation.id === id ? occupationUpdated : occupation
    ));
    return occupationUpdated;
  }

  async delete (id: number): Promise<Occupation | null> {
    const occupation = await this.findById(id);
    if (!occupation) return null;

    this.occupations = this.occupations.filter(occupation => occupation.id !== id);
    return occupation;
  }
}
