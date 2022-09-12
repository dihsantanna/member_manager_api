import { IMemberRepository } from '..';
import { Member, Ministry, Occupation } from '../../entities';

const MINISTRIES = {
  1: new Ministry({ id: 1, name: 'Ministério 1' }),
  2: new Ministry({ id: 2, name: 'Ministério 2' })
};

const OCCUPATIONS = {
  1: new Occupation({ id: 1, name: 'Cargo 1' }),
  2: new Occupation({ id: 2, name: 'Cargo 2' })
};

interface IMemberMinistry {
  ministryId: number
  memberId: number
}

interface IMemberOccupation {
  occupationId: number
  memberId: number
}

export class MemberRepositoryInMemory implements IMemberRepository {
  members: Member[] = [];
  ministries: Ministry[] = [
    MINISTRIES[1],
    MINISTRIES[2]
  ];

  occupations: Occupation[] = [
    OCCUPATIONS[1],
    OCCUPATIONS[2]
  ];

  memberMinistry: IMemberMinistry[] = [];
  memberOccupation: IMemberOccupation[] = [];

  nextId = 1;

  async create (data: Member): Promise<Member> {
    const member = {
      ...data.allProps,
      id: this.nextId
    };
    delete member.occupations;
    delete member.ministries;

    const { ministries, occupations } = data;

    if (occupations?.length) {
      this.memberOccupation = [
        ...this.memberOccupation,
        ...occupations
          .map(occupation => ({
            occupationId: occupation as number, memberId: this.nextId
          }))];
    }

    if (ministries?.length) {
      this.memberMinistry = [
        ...this.memberMinistry,
        ...ministries
          .map(ministry => ({
            ministryId: ministry as number, memberId: this.nextId
          }))];
    }

    const newMember = new Member(member);

    this.members.push(newMember);

    this.nextId += 1;

    const memberReturn = new Member({
      ...newMember.allProps,
      ministries: ministries?.map(id => (new Ministry({
        id: id as number,
        name: this.ministries
          .find(ministry => (ministry.id === id))?.name as string
      }))),
      occupations: occupations?.map(id => (new Occupation({
        id: id as number,
        name: this.occupations
          .find(occupation => (occupation.id === id))?.name as string
      })))
    });

    return memberReturn;
  }

  async findByEmail (email: string): Promise<Member | null> {
    const member = this.members.find(member => member.email === email);
    return member || null;
  }

  async findAll (): Promise<Member[]> {
    return this.members.map(member => (
      new Member({
        ...member.allProps,
        ministries: this.memberMinistry.filter(({ memberId }) => (memberId === member.id as number))
          .map(({ ministryId }) => (new Ministry({
            id: ministryId,
            name: this.ministries.find(ministry => (ministry.id === ministryId))?.name as string
          }))),
        occupations: this.memberOccupation.filter(({ memberId }) => (memberId === member.id as number))
          .map(({ occupationId }) => (new Occupation({
            id: occupationId,
            name: this.occupations.find(occupation => (occupation.id === occupationId))?.name as string
          })))
      })
    ));
  }
}
