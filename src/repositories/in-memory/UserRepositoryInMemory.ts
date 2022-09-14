import { Person } from '../../entities';
import { User } from '../../entities/User';
import { IUserRepository } from '../UserRepository';

interface MemberInMemory extends Person {
  email: string
}

export class UserRepositoryInMemory implements IUserRepository {
  members: MemberInMemory[] = [{ fullName: 'John Doe', email: 'john@email.com' }];
  users: User[] = [];
  nextId = 1;

  async create (user: User): Promise<User> {
    const newUser = new User({
      ...user,
      id: this.nextId
    });
    this.users.push(newUser);

    this.nextId++;

    const { id, email, roleName } = newUser;

    const fullName = this.members.find(member => member.email === email)?.fullName;

    return new User({ id, fullName, email, roleName });
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    if (!user) return null;

    const { id, roleName, password } = user;

    const fullName = this.members.find(member => member.email === email)?.fullName;

    return new User({ id, fullName, email, password, roleName });
  }

  async findById (id: number): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    if (!user) return null;

    const { email, roleName } = user;

    const fullName = this.members.find(member => member.email === email)?.fullName;

    return new User({ id, fullName, email, roleName });
  }

  async findAll (): Promise<User[]> {
    return this.users.map(({ id, email, roleName }) => (
      new User({
        id,
        fullName: this.members.find(member => member.email === email)?.fullName,
        email,
        roleName
      })
    ));
  }
}
