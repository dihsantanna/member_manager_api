import { Member } from '../entities';

export interface IMemberRepository {
  create: (data: Member) => Promise<Member>
  findByEmail: (email: string) => Promise<Member | null>
}
