import { Member, Ministry, Occupation } from '../entities';
import { UpdateData } from '../use-cases/member';

export interface IMemberRepository {
  create: (data: Member) => Promise<Member>
  findByEmail: (email: string) => Promise<Member | null>
  findById: (id: number) => Promise<Member | null>
  findAll: () => Promise<Member[]>
  findMemberMinistry: (id: number) => Promise<Ministry[] | null>
  findMemberOccupation: (id: number) => Promise<Occupation[] | null>
  update: (id: number, data: UpdateData) => Promise<Member>
  delete: (id: number) => Promise<Member>
}
