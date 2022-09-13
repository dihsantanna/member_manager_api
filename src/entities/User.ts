import { Person } from './Member';

export interface UserProps extends Person {
  id?: number
  email: string
  password: string
  roleName: string
  scope?: string[]
}

export class User implements UserProps {
  readonly id?: number;
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly roleName: string;
  readonly scope?: string[];

  constructor (props: UserProps) {
    if (props.id) this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.password = props.password;
    this.roleName = props.roleName;
    if (props.scope) this.scope = props.scope;
  }
}
