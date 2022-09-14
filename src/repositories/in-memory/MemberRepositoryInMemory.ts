import { IMemberRepository } from '..';
import { Member, Ministry, Occupation } from '../../entities';
import { UpdateData } from '../../use-cases/member';

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
      ...data,
      id: this.nextId
    };

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
      ...newMember,
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

  async findById (id: number): Promise<Member | null> {
    const member = this.members.find(member => member.id === id);
    if (!member) {
      return null;
    }
    return new Member({
      ...member,
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
    });
  }

  async findAll (): Promise<Member[]> {
    return this.members.map(member => (
      new Member({
        ...member,
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

  async findMemberMinistry (id: number): Promise<Ministry[] | null> {
    const member = await this.findById(id);

    if (!member) {
      return null;
    }

    return this.memberMinistry
      .filter(({ memberId }) => (memberId === id))
      .map(({ ministryId }) => (new Ministry({
        id: ministryId,
        name: this.ministries
          .find(ministry => (ministry.id === ministryId))?.name as string
      })));
  }

  async findMemberOccupation (id: number): Promise<Occupation[] | null> {
    const member = await this.findById(id);

    if (!member) {
      return null;
    }

    return this.memberOccupation
      .filter(({ memberId }) => (memberId === id))
      .map(({ occupationId }) => (new Occupation({
        id: occupationId,
        name: this.occupations
          .find(occupation => (occupation.id === occupationId))?.name as string
      })));
  }

  async update (id: number, data: UpdateData): Promise<Member> {
    this.members = this.members.map(member => (
      member.id === id ? new Member({ ...member, ...data }) : member
    ));

    return Promise.resolve(this.members.find(member => member.id === id) as Member);
  }

  async updateMemberInMinistry (id: number, data: number[]): Promise<Ministry[] | null> {
    const member = this.members.find(member => member.id === id);

    if (!member) {
      return null;
    }

    const ministries = this.memberMinistry.filter(({ memberId }) => (memberId === id))
      .map(({ ministryId }) => ministryId);

    const memberMinistryDeleted = ministries.filter(ministryId => !data.includes(ministryId));
    const memberMinistryAdded = data.filter(ministryId => !ministries.includes(ministryId))
      .map(ministryId => ({ ministryId, memberId: id }));

    if (memberMinistryDeleted.length) {
      this.memberMinistry = this.memberMinistry.filter(({ memberId, ministryId }) => (
        !(memberId === id && memberMinistryDeleted.includes(ministryId))
      ));
    }

    if (memberMinistryAdded.length) {
      this.memberMinistry = [
        ...this.memberMinistry,
        ...memberMinistryAdded
      ];
    }

    return this.memberMinistry.filter(({ memberId }) => (memberId === id))
      .map(({ ministryId }) => (
        this.ministries.find(ministry => (ministry.id === ministryId))
      )) as Ministry[];
  }

  async updateMemberInOccupation (id: number, data: number[]): Promise<Occupation[] | null> {
    const member = this.members.find(member => member.id === id);

    if (!member) {
      return null;
    }

    const occupations = this.memberOccupation.filter(({ memberId }) => (memberId === id))
      .map(({ occupationId }) => occupationId);

    const memberOccupationDeleted = occupations.filter(occupationId => !data.includes(occupationId));
    const memberOccupationAdded = data.filter(occupationId => !occupations.includes(occupationId))
      .map(occupationId => ({ occupationId, memberId: id }));

    if (memberOccupationDeleted.length) {
      this.memberOccupation = this.memberOccupation.filter(({ memberId, occupationId }) => (
        !(memberId === id && memberOccupationDeleted.includes(occupationId))
      ));
    }

    if (memberOccupationAdded.length) {
      this.memberOccupation = [
        ...this.memberOccupation,
        ...memberOccupationAdded
      ];
    }

    return this.memberOccupation.filter(({ memberId }) => (memberId === id))
      .map(({ occupationId }) => (
        this.occupations.find(occupation => (occupation.id === occupationId))
      )) as Occupation[];
  }

  async delete (id: number): Promise<Member> {
    const member = this.members.find(member => member.id === id) as Member;
    this.memberMinistry = this.memberMinistry.filter(({ memberId }) => (memberId !== id));
    this.memberOccupation = this.memberOccupation.filter(({ memberId }) => (memberId !== id));
    this.members = this.members.filter(member => member.id !== id);
    return member;
  }
}
