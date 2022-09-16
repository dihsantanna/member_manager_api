export interface MinistryProps {
  id?: number
  name: string
}

export class Ministry implements MinistryProps {
  readonly id?: number;
  readonly name: string;

  constructor (props: MinistryProps) {
    if (props.id) this.id = props.id;
    this.name = props.name;
  }
}

export class MinistryWithMembersQty extends Ministry {
  constructor (ministry: MinistryProps, readonly membersQty: number) {
    super(ministry);
  }
}
