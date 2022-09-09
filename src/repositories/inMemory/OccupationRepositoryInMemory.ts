import { IOccupationRepository } from '..';
import { Occupation, OccupationProps } from '../../entities';

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

  async update (id: number, { name }: OccupationProps): Promise<Occupation | null> {
    const occupation = await this.findById(id);
    if (!occupation) return null;

    const occupationUpdated = new Occupation({ id, name });

    this.occupations = this.occupations.map(occupation => (
      occupation.id === id ? occupationUpdated : occupation
    ));
    return occupationUpdated;
  }
}
