import { IOccupationRepository } from '..';
import { Occupation } from '../../entities';

export class OccupationRepositoryInMemory implements IOccupationRepository {
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
}
