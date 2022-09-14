import { Member, Ministry, MinistryProps } from '../entities';

export class MinistryWithMembersQty extends Ministry {
  constructor (ministry: MinistryProps, readonly membersQty: number) {
    super(ministry);
  }
}

export interface IMinistryRepository {
  create: (data: Ministry) => Promise<Ministry>
  findAll: () => Promise<MinistryWithMembersQty[]>
  findById: (id: number) => Promise<Ministry | null>
  findByName: (name: string) => Promise<Ministry | null>
  findMembersOfMinistry: (ministryId: number) => Promise<Member[] | null>
  update: (id: number, data: MinistryProps) => Promise<Ministry | null>
  delete: (id: number) => Promise<Ministry | null>
}
