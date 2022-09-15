import { User } from '../entities/User';

export interface UpdateUserData { email?: string, roleName?: string }

export interface IUserRepository {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: number) => Promise<User | null>
  findAll: () => Promise<User[]>
  update: (id: number, data: UpdateUserData) => Promise<User>
  updatePassword: (id: number, password: string) => Promise<void>
}
