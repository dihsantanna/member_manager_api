export interface MinistryProps {
  id?: number
  name: string
}

export class Ministry {
  readonly id?: number;
  readonly name: string;

  constructor (props: MinistryProps) {
    if (props.id) this.id = props.id;
    this.name = props.name;
  }
}
