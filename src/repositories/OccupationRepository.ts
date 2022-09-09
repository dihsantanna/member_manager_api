import { Occupation, OccupationProps } from '../entities';

export interface IOccupationRepository {
  create: (data: Occupation) => Promise<Occupation>
  findAll: () => Promise<Occupation[]>
  findById: (id: number) => Promise<Occupation | null>
  findByName: (name: string) => Promise<Occupation | null>
  update: (id: number, data: OccupationProps) => Promise<Occupation | null>
}
