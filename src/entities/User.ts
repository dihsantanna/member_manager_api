import { Person } from './Member';

export interface UserProps extends Person {
  id?: number
  email: string
  password: string
  roleName: string
  scope?: string[]
}

export class User {
  constructor (private props: UserProps) { }

  get id () {
    return this.props.id;
  }

  get fullName () {
    return this.props.fullName;
  }

  get email () {
    return this.props.email;
  }

  get password () {
    return this.props.password;
  }

  get roleName () {
    return this.props.roleName;
  }

  get scope () {
    return this.props.scope;
  }
}
