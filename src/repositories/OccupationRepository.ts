import { Member, Occupation, OccupationProps } from '../entities';

export interface IOccupationRepository {
  create: (data: Occupation) => Promise<Occupation>
  findAll: () => Promise<Occupation[]>
  findById: (id: number) => Promise<Occupation | null>
  findByName: (name: string) => Promise<Occupation | null>
  findMembersOfOccupation: (occupationId: number) => Promise<Member[] | null>
  update: (id: number, data: OccupationProps) => Promise<Occupation | null>
  delete: (id: number) => Promise<Occupation | null>
}
