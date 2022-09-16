import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import {
  Member,
  Ministry,
  MinistryProps,
  MinistryWithMembersQty
} from '../entities';
import { Model, MODEL } from '../model';

export interface IMinistryRepository {
  create: (data: Ministry) => Promise<Ministry>
  findAll: () => Promise<MinistryWithMembersQty[]>
  findById: (id: number) => Promise<Ministry | null>
  findByName: (name: string) => Promise<Ministry | null>
  findMembersOfMinistry: (ministryId: number) => Promise<Member[] | null>
  update: (id: number, data: MinistryProps) => Promise<Ministry | null>
  delete: (id: number) => Promise<Ministry | null>
}

@Injectable()
export class MinistryRepository implements IMinistryRepository {
  constructor (
    @Inject(MODEL) private model: Model
  ) { }

  async create ({ name }: Ministry): Promise<Ministry> {
    const ministry = await this.model.ministry.create({
      data: {
        name
      }
    });
    return new Ministry(ministry);
  }

  async findAll (): Promise<MinistryWithMembersQty[]> {
    const ministries = await this.model.ministry.findMany({
      include: {
        members: true
      }
    });
    return ministries.map(({ id, name, members }) => (
      new MinistryWithMembersQty({ id, name }, members.length)
    ));
  }

  async findById (id: number): Promise<Ministry | null> {
    const ministry = await this.model.ministry.findUnique({
      where: { id }
    });
    return ministry ? new Ministry(ministry) : null;
  }

  async findByName (name: string): Promise<Ministry | null> {
    const ministry = await this.model.ministry.findUnique({
      where: { name }
    });
    return ministry ? new Ministry(ministry) : null;
  }

  async findMembersOfMinistry (ministryId: number): Promise<Member[] | null> {
    const ministry = await this.model.ministry.findUnique({
      where: { id: ministryId },
      include: {
        members: {
          select: {
            member: true
          }
        }
      }
    });

    if (!ministry) return null;

    return ministry.members.map(({ member }) => new Member(member));
  }

  async update (id: number, { name }: MinistryProps): Promise<Ministry | null> {
    const ministry = await this.model.ministry.update({
      where: { id },
      data: { name }
    });
    return ministry ? new Ministry(ministry) : null;
  }

  async delete (id: number): Promise<Ministry | null> {
    const ministry = await this.model.ministry.delete({
      where: { id }
    });
    return ministry ? new Ministry(ministry) : null;
  }
}

export const MINISTRY_REPOSITORY = new InjectionToken('MINISTRY_REPOSITORY');

Container.provide([{
  provide: MINISTRY_REPOSITORY,
  useClass: MinistryRepository
}]);
