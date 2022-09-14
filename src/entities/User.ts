
export interface UserProps {
  id?: number
  fullName?: string
  email: string
  password?: string
  roleName: string
  scope?: string[]
}

export class User implements UserProps {
  readonly id?: number;
  readonly fullName?: string;
  readonly email: string;
  readonly password?: string;
  readonly roleName: string;
  readonly scope?: string[];

  constructor (props: UserProps) {
    if (props.id) this.id = props.id;
    if (props.fullName) this.fullName = props.fullName;
    this.email = props.email;
    if (props.password) this.password = props.password;
    this.roleName = props.roleName;
    if (props.scope) this.scope = props.scope;
  }
}
