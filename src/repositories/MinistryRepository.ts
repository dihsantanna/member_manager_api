import { Ministry } from '../entities';

export interface IMinistryRepository {
  create: (data: Ministry) => Promise<Ministry>
  findById: (id: number) => Promise<Ministry | null>
  findByName: (name: string) => Promise<Ministry | null>
}
