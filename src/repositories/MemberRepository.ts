import { Member, Ministry } from '../entities';

export interface IMemberRepository {
  create: (data: Member) => Promise<Member>
  findByEmail: (email: string) => Promise<Member | null>
  findById: (id: number) => Promise<Member | null>
  findAll: () => Promise<Member[]>
  findMemberMinistry: (id: number) => Promise<Ministry[] | null>
}
